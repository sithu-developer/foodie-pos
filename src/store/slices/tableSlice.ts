import { DeleteTableOptions, NewTableOptions, TalbeSliceInitialState, UpdateTableOptions } from "@/types/table";
import { config } from "@/utils/config";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : TalbeSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const updateTable = createAsyncThunk("tableSlice/updateTable" ,async(options : UpdateTableOptions , thunkApi) => {
    const {id, locationId, name, onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/tables`, {
            method : "PUT" ,
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({id , name , locationId})
        });
        const {table} = await response.json();
        thunkApi.dispatch(replaceTable(table));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const deleteTable = createAsyncThunk("tableSlice/deleteTable" ,async(options : DeleteTableOptions , thunkApi) => {
    const {id, onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/tables?id=${id}`, {
            method : "DELETE" 
        });
        const {table} = await response.json();
        thunkApi.dispatch(removeTable(table));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const createTable = createAsyncThunk("tableSlice/createTable" ,async(options : NewTableOptions , thunkApi) => {
    const {locationId, name, onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/tables`, {
            method : "POST" ,
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({ name , locationId})
        });
        const { table } = await response.json();
        thunkApi.dispatch(addTable(table))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})


const tableSlice = createSlice({
    name : "tableSlice",
    initialState,
    reducers : {
        setTable : (state , action) => {
            state.items = action.payload;
        },
        replaceTable : (state , action : PayloadAction<Table>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item)
        },
        removeTable : ( state , action : PayloadAction<Table>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        addTable : (state , action : PayloadAction<Table> ) => {
            state.items = [...state.items , action.payload]
        }
    }
})

export const {setTable , replaceTable ,removeTable , addTable} = tableSlice.actions;

export default tableSlice.reducer;