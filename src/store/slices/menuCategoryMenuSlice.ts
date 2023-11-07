import { InitialState } from "@/types/menuCategoryMenu";
import { Menu, MenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : InitialState = {
    items : [],
    isLoading : false,
    error : null
}

const menuCategoryMenuSlice = createSlice({
    name : "menuCategoryMenuSlice",
    initialState ,
    reducers : {
        setMenuCategoryMenu : (state , action) => {
            state.items = action.payload;
        },
        addMenuCategoryMenu : (state , action) => {
            state.items = [...state.items , ...action.payload]  // **
        },
        replaceMenuCategoryMenu : (state , action) => {
            const otherMenuCategoryMenus = state.items.filter(item => item.menuId !== action.payload[0].menuId);
            state.items = [...otherMenuCategoryMenus , ...action.payload];
        },
        removeMenuCategoryMenuFromMenu : (state , action : PayloadAction<Menu>) => {
            state.items = state.items.filter(item => item.menuId !== action.payload.id)
        },
        removeMenuCategoryMenuFromMenuCategory : (state , action : PayloadAction<MenuCategory>) => {
            state.items = state.items.filter(item => item.menuCategoryId !== action.payload.id);
        }
    }
})

export const {setMenuCategoryMenu , addMenuCategoryMenu , replaceMenuCategoryMenu , removeMenuCategoryMenuFromMenu , removeMenuCategoryMenuFromMenuCategory} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
