import { AddonSliceInitialState } from "@/types/addon";
import { createSlice } from "@reduxjs/toolkit";

const initialState : AddonSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

const addonSlice = createSlice({
    name : "addonSlice",
    initialState,
    reducers : {
        setAddon : (state , action) => {
            state.items = action.payload;
        }
    }
})

export const {setAddon} = addonSlice.actions;

export default addonSlice.reducer;