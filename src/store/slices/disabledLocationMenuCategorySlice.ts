import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategory";
import { createSlice } from "@reduxjs/toolkit";


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
        }
    }
})

export const {setDisabledLocationMenuCategory} = disabledLocationMenuCategorySlice.actions;

export default disabledLocationMenuCategorySlice.reducer;