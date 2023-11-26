import { CreateNewMenuOption, DeleteMenuOption, GetMenusOption, MenuSliceInitialState, UpdateMenuOption } from "@/types/menu";
import { config } from "@/utils/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuCategoryMenu, removeMenuCategoryMenuFromMenu, replaceMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { Menu, MenuCategoryMenu } from "@prisma/client";
import { removeMenuAddonCategoriesFromMenu } from "./menuAddonCategorySlice";
import { addDisabledLocationMenu, removeDisabledLocationMenu } from "./disabledLocationMenuSlice";

const initialState : MenuSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const getMenus = createAsyncThunk("menuSlice/getMenu", async(options : GetMenusOption , thunkApi) => {
    const {onSuccess, onError, locationId} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menus?locationId=${locationId}`);
        const menus = await response.json();
        thunkApi.dispatch(setMenus(menus));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
});

export const createNewMenu = createAsyncThunk("menuSlice/createNewMenu" , async(option : CreateNewMenuOption , thunkApi) => {
    const {name, price, selectedMenuCategoryIds, assetUrl,  onError , onSuccess} = option;
    try {   
        const response = await fetch(`${config.apiBaseUrl}/menus` , {
            method : "POST", 
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({name , price ,assetUrl , selectedMenuCategoryIds})
        });
        const {newMenu , menuCategoryMenus} = await response.json();
        thunkApi.dispatch(addMenu(newMenu));
        thunkApi.dispatch(addMenuCategoryMenu(menuCategoryMenus));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateMenu = createAsyncThunk("menuSlice/updateMenu" , async(option : UpdateMenuOption , thunkApi) => {
    const { id ,name, price, isAvailable , locationId ,selectedMenuCategoryIds, assetUrl,  onError , onSuccess} = option;
    try {   
        const response = await fetch(`${config.apiBaseUrl}/menus` , {
            method : "PUT", 
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({id , name , isAvailable , price , locationId , assetUrl , selectedMenuCategoryIds})
        });
        const {updatedMenu, updatedMenuCategoryMenus , disabledLocationMenu} = await response.json();
        thunkApi.dispatch(replaceMenu(updatedMenu));
        thunkApi.dispatch(replaceMenuCategoryMenu(updatedMenuCategoryMenus));
        if(disabledLocationMenu && isAvailable === false ) {
            thunkApi.dispatch(addDisabledLocationMenu(disabledLocationMenu))
        } else if( disabledLocationMenu && isAvailable === true) {
            thunkApi.dispatch(removeDisabledLocationMenu(disabledLocationMenu))
        }  
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const deleteMenu = createAsyncThunk("menuSlice/deleteMenu" , async(option : DeleteMenuOption , thunkApi) => {
    const {id , onError , onSuccess  } = option;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menus?id=${id}` , {
            method : "DELETE"
        });
        const {menu} = await response.json();
        thunkApi.dispatch(removeMenu(menu));
        thunkApi.dispatch(removeMenuCategoryMenuFromMenu(menu));
        thunkApi.dispatch(removeMenuAddonCategoriesFromMenu(menu));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

const menuSlice = createSlice({
    name : "menuSlice",
    initialState,
    reducers : {
        setMenus : (state , action) => {
            state.items = action.payload;
        },
        addMenu : (state , action ) => {
            state.items = [...state.items, action.payload];
        },
        replaceMenu : (state , action ) => {
            state.items = state.items.map(menu => menu.id === action.payload.id ? action.payload : menu);
            // const clearedMenus = state.items.filter(menu => menu.id !== action.payload.id);
            // state.items = [...clearedMenus, action.payload]
        },
        removeMenu : (state , action : PayloadAction<Menu> ) => {
            state.items = state.items.filter(menu => menu.id !== action.payload.id);
        }
    }
})

export const {setMenus , addMenu , replaceMenu , removeMenu} = menuSlice.actions;

export default menuSlice.reducer;