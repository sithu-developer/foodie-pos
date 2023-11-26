import { AppSlice, GetAppDataOption } from "@/types/app";
import { CartItem, CartSlice } from "@/types/cart";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : CartSlice = {
    items : [],
    isLoading : false,
    error : null
}


const appSlice = createSlice({
    name : "appSlice",
    initialState,
    reducers : {
        addCartItem : (state , action : PayloadAction<CartItem>) => {
            state.items = [...state.items , action.payload ];
        },
        removeCartItem : (state ,action : PayloadAction<CartItem> ) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        replaceCartItem : (state , action : PayloadAction<CartItem>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item)
        },
        emptyCart : (state) => {
            state.items = []
        }
    }
})

export const {addCartItem , removeCartItem , replaceCartItem , emptyCart } = appSlice.actions;
export default appSlice.reducer;