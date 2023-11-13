import { AppSlice, GetAppDataOption } from "@/types/app";
import { CartSlice } from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : CartSlice = {
    items : [],
    isLoading : false,
    error : null
}

export const fetchGetAppData = createAsyncThunk("appSlice/getAppData", async( options : GetAppDataOption , thunkApi) => {
    const { companyId , tableId } = options;
    try {
        const appDataUrl = companyId && tableId ? `${config.apiBaseUrl}/app?companyId=${companyId}&tableId=${tableId}`
        : `${config.apiBaseUrl}/app`;
        const response = await fetch(appDataUrl);
        const appData = await response.json();
        const {} = appData;
    } catch (err) {
        // onError && onError();
    }
})

const appSlice = createSlice({
    name : "appSlice",
    initialState,
    reducers : {
        setCartItems : (state , action) => {
            state.items = action.payload;
        }
    }
})

export const {setCartItems} = appSlice.actions;
export default appSlice.reducer;