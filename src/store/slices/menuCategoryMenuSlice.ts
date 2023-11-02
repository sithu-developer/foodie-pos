import { InitialState } from "@/types/menuCategoryMenu";
import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const {setMenuCategoryMenu , addMenuCategoryMenu , replaceMenuCategoryMenu} = menuCategoryMenuSlice.actions;
export default menuCategoryMenuSlice.reducer;
