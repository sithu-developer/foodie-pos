import { CreateMenuCategoryOption, MenuCategorySliceInitialState } from "@/types/menuCategory";
import { config } from "@/utils/config";
import { MenuCategory } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        const menuCategory = await response.json();
        thunkApi.dispatch(addMenuCategory(menuCategory));
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
        }
    }
})

export const {setMenuCategories, addMenuCategory} = menuCategorySlice.actions;

export default menuCategorySlice.reducer;