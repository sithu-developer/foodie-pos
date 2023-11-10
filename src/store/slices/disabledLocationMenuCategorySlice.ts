import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategory";
import { DisabledLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState : DisabledLocationMenuCategorySlice = {
    items : [] ,
    isLoading : false,
    error : null
}

const disabledLocationMenuCategorySlice = createSlice({
    name : "disabledLocationMenuCategorySlice",
    initialState,
    reducers : {
        setDisabledLocationMenuCategory : (state , action) => {
            state.items = action.payload;
        },
        addDisabledLocationMenuCategory : (state , action : PayloadAction<DisabledLocationMenuCategory>) => {
            const exist = state.items.find(item => item.id === action.payload.id);
            if(!exist) state.items = [...state.items , action.payload];
        },
        removeDisabledLocationMenuCategory : (state , action : PayloadAction<DisabledLocationMenuCategory>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }
    }
})

export const {setDisabledLocationMenuCategory , addDisabledLocationMenuCategory , removeDisabledLocationMenuCategory} = disabledLocationMenuCategorySlice.actions;

export default disabledLocationMenuCategorySlice.reducer;