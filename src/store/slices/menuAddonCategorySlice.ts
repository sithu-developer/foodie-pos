import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { AddonCategory, Menu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState : MenuAddonCategorySlice = {
    items : [] ,
    isLoading : false,
    error : null
}

const menuAddonCategorySlice = createSlice({
    name : "menuAddonCategorySlice",
    initialState,
    reducers : {
        setMenuAddonCategories : (state , action) => {
            state.items = action.payload;
        },
        addMenuAddonCategories : (state ,action ) => {
            state.items = [...state.items , ...action.payload];
        },
        replaceMenuAddonCategories : (state , action) => {
            const otherMenuAddonCategories = state.items.filter(item => item.addonCategoryId !== action.payload[0].addonCategoryId);
            state.items = [...otherMenuAddonCategories, ...action.payload];
        },
        removeMenuAddonCategoriesFromMenu : (state ,action : PayloadAction<Menu>) => {
            state.items = state.items.filter(item => item.menuId !== action.payload.id);
        },
        removeMenuAddonCategoriesFromAddonCategory : (state , action : PayloadAction<AddonCategory>) => {
            state.items = state.items.filter(item => item.addonCategoryId !== action.payload.id)
        }
    }
})

export const {setMenuAddonCategories , addMenuAddonCategories , replaceMenuAddonCategories , removeMenuAddonCategoriesFromMenu , removeMenuAddonCategoriesFromAddonCategory} = menuAddonCategorySlice.actions;

export default menuAddonCategorySlice.reducer;