import { TalbeSliceInitialState } from "@/types/table";
import { createSlice } from "@reduxjs/toolkit";

const initialState : TalbeSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

const tableSlice = createSlice({
    name : "tableSlice",
    initialState,
    reducers : {
        setTable : (state , action) => {
            state.items = action.payload;
        }
    }
})

export const {setTable} = tableSlice.actions;

export default tableSlice.reducer;