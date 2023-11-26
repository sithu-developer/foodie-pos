import { SnackbarSlice } from "@/types/snackbarSlice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : SnackbarSlice = {
    message : null,
    autoHideDuration : 5000,
    open : false,
    severity : "success"
}

const snackbarSlice = createSlice({
    name : "snackbarSlice",
    initialState ,
    reducers : {
        setOpenSnackbar : (state , action : PayloadAction<SnackbarSlice>) => {
            const {message  , autoHideDuration = 5000 , severity = "success"} = action.payload;
            state.open = true;
            state.autoHideDuration = autoHideDuration;
            state.message = message;
            state.severity = severity;
        },
        resetSnackbar : (state ) => {
            state.autoHideDuration = 3000;
            state.message = null ;
            state.open = false;
            state.severity = "success";
        }
    }
})

export const { setOpenSnackbar , resetSnackbar} = snackbarSlice.actions;

export default snackbarSlice.reducer;