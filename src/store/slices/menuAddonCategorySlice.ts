import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { createSlice } from "@reduxjs/toolkit";


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
        }
    }
})

export const {setMenuAddonCategories , addMenuAddonCategories , replaceMenuAddonCategories } = menuAddonCategorySlice.actions;

export default menuAddonCategorySlice.reducer;