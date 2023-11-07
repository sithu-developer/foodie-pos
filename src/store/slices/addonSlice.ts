import { AddonSliceInitialState, DeleteAddonOptions, NewAddonOptions, UpdateAddonOptions } from "@/types/addon";
import { config } from "@/utils/config";
import { Addon, MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : AddonSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createAddon = createAsyncThunk("addonSlice/updateAddon" , async ( options : NewAddonOptions , thunkApi) => {
    const { addonCategoryId ,name ,price = 0 ,onError ,onSuccess} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addons` , {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , price , addonCategoryId})
        });
        const {addon} = await response.json();
        thunkApi.dispatch(addAddon(addon))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateAddon = createAsyncThunk("addonSlice/updateAddon" , async ( options : UpdateAddonOptions , thunkApi) => {
    const {id , addonCategoryId ,name ,price = 0 ,onError ,onSuccess} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addons` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name , price , addonCategoryId})
        });
        const {addon} = await response.json();
        thunkApi.dispatch(replaceAddon(addon));

        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const deleteAddon = createAsyncThunk("addonSlice/deleteAddon" , async ( options : DeleteAddonOptions , thunkApi) => {
    const { id  ,onError ,onSuccess} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addons?id=${id}` , {
            method : "DELETE"
        });
        const {addon} = await response.json();
        thunkApi.dispatch(removeAddon(addon))

        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

const addonSlice = createSlice({
    name : "addonSlice",
    initialState,
    reducers : {
        setAddon : (state , action) => {
            state.items = action.payload;
        },
        replaceAddon : (state , action : PayloadAction<Addon> ) => {
            state.items = state.items.map(item => item.id === action.payload.id? action.payload : item)
        },
        addAddon : (state , action : PayloadAction<Addon>) => {
            state.items = [...state.items , action.payload]
        },
        removeAddon : (state , action : PayloadAction<Addon>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
        removeAddonFromAddonCategory : (state , action : PayloadAction<MenuCategory>) => {
            state.items = state.items.filter(item => item.addonCategoryId !== action.payload.id)
        }
    }
})

export const {setAddon , replaceAddon , addAddon , removeAddon , removeAddonFromAddonCategory} = addonSlice.actions;

export default addonSlice.reducer;