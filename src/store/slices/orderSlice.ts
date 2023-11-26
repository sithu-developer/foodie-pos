import { CreateOrderOptions, OrderSliceInitialState, RefreshOrderBackofficeOptions, RefreshOrderOptions, UpdateOrderOptions } from "@/types/order";
import { config } from "@/utils/config";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : OrderSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}


export const createOrder = createAsyncThunk("orderSlice/createOrder" ,async(options : CreateOrderOptions , thunkApi) => {
    const {tableId , cartItems , totalPrice , onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/orders`, {
            method : "POST" ,
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({tableId , cartItems , totalPrice })
        });
        const { orders } = await response.json();
        thunkApi.dispatch(setOrders(orders))
        onSuccess && onSuccess(orders);  
    } catch (err) {
        onError && onError();
    }
})

export const updateOrder = createAsyncThunk("orderSlice/updateOrder" ,async(options : UpdateOrderOptions , thunkApi) => {
    const {itemId , status , onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/orders?itemId=${itemId}`, {
            method : "PUT" ,
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({ status })
        });
        const { orders } = await response.json();
        thunkApi.dispatch(setOrders(orders))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const refreshOrder = createAsyncThunk("orderSlice/refreshOrder" ,async(options : RefreshOrderOptions , thunkApi) => {
    const {orderSeq , onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/orders?orderSeq=${orderSeq}`)
        const { orders } = await response.json();
        thunkApi.dispatch(setOrders(orders))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
});

export const refreshOrderBackoffice = createAsyncThunk("orderSlice/refreshOrderBackoffice" ,async(options : RefreshOrderBackofficeOptions , thunkApi) => {
    const {locationId , onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/orders?locationId=${locationId}`)
        const { orders } = await response.json();
        thunkApi.dispatch(setOrders(orders))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
});


const orderSlice = createSlice({
    name : "orderSlice",
    initialState,
    reducers : {
        setOrders : (state , action : PayloadAction<Order[]>) => {
            state.items = action.payload;
        },
    }
})

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;