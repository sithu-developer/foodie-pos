import { CreateMenuCategoryOption, DeleteMenuCategoryOptions, MenuCategorySliceInitialState, UpdateMenuCategoryOptions } from "@/types/menuCategory";
import { config } from "@/utils/config";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeMenuCategoryMenuFromMenuCategory } from "./menuCategoryMenuSlice";
import { addDisabledLocationMenuCategory, removeDisabledLocationMenuCategory } from "./disabledLocationMenuCategorySlice";

const initialState : MenuCategorySliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createMenuCategory = createAsyncThunk("menuCategorySlice/createMenuCategory", async(options : CreateMenuCategoryOption , thunkApi) => {
    const {onSuccess, onError, name, locationId} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menu-categories`, {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , locationId })
        });
        const {menuCategory} = await response.json();
        thunkApi.dispatch(addMenuCategory(menuCategory));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateMenuCategory = createAsyncThunk("menuCategorySlice/updateMenuCategory", async(options : UpdateMenuCategoryOptions , thunkApi) => {
    const {onSuccess, onError, id , isAvailable ,  name, locationId} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menu-categories`, {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name  , isAvailable, locationId })
        });
        const {menuCategory , disabledLocationMenuCategory } = await response.json();
        thunkApi.dispatch(replaceMenuCategory(menuCategory));
        if(disabledLocationMenuCategory && isAvailable === false) {
            thunkApi.dispatch(addDisabledLocationMenuCategory(disabledLocationMenuCategory));
        } else if(disabledLocationMenuCategory && isAvailable === true) {
            thunkApi.dispatch(removeDisabledLocationMenuCategory(disabledLocationMenuCategory))
        }
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const deleteMenuCategory = createAsyncThunk("menuCategorySlice/deleteMenuCategory", async(options : DeleteMenuCategoryOptions , thunkApi) => {
    const {onSuccess, onError, id } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menu-categories?id=${id}`, {
            method : "DELETE",
        });
        const {menuCategory} = await response.json();
        thunkApi.dispatch(removeMenuCategory(menuCategory));
        thunkApi.dispatch(removeMenuCategoryMenuFromMenuCategory(menuCategory));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

const menuCategorySlice = createSlice({
    name : "menuCategorySlice",
    initialState,
    reducers : {
        setMenuCategories : (state , action) => {
            state.items = action.payload;
        },
        addMenuCategory : (state , action ) => {
            state.items = [...state.items , action.payload];
        },
        replaceMenuCategory : (state , action : PayloadAction<MenuCategory>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item)
        },
        removeMenuCategory : (state , action : PayloadAction<MenuCategory> ) => {
            state.items = state.items.filter(item => item.id !== action.payload.id );
        }
    }
})

export const {setMenuCategories, addMenuCategory , replaceMenuCategory , removeMenuCategory} = menuCategorySlice.actions;

export default menuCategorySlice.reducer;