import { AddonCategorySliceInitialState, DeleteAddonCategoryOptions, NewAddonCategoryOptions, UpdateAddonCategoryOptions } from "@/types/addonCategory";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuAddonCategories, replaceMenuAddonCategories } from "./menuAddonCategorySlice";

const initialState : AddonCategorySliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createAddonCategory = createAsyncThunk("addonCategorySlice/createAddonCategory" , async( option : NewAddonCategoryOptions , thunkApi) => {
    const {name , isRequired , selectedMenuIds , onSuccess, onError} = option;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addon-categories` , {
            method : "POST" , 
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({name , isRequired , selectedMenuIds})
        });
        const {addonCategory , menuAddonCategories} = await response.json();
        thunkApi.dispatch(addAddonCategory(addonCategory));
        thunkApi.dispatch(addMenuAddonCategories(menuAddonCategories));
        onSuccess && onSuccess()
    } catch (err) {
        onError && onError()
    }
})

export const deleteAddonCategory = createAsyncThunk("addonCategorySlice/deleteAddonCategory" , async ( option : DeleteAddonCategoryOptions , thunkApi) => {
    const { id , onSuccess , onError } = option;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addon-categories?id=${id}` , {
            method : "DELETE"
        });
        const {addonCategory} = await response.json();
        if(addonCategory.id === id) thunkApi.dispatch(removeAddonCategory(addonCategory))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
});

export const updateAddonCategory = createAsyncThunk("addonCategorySlice/updateAddonCategory" , async ( option : UpdateAddonCategoryOptions , thunkApi) => {
    const { id , name , isRequired , selectedMenuIds , onError , onSuccess } = option;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addon-categories`, {
            method : "PUT", 
            headers : {
                "content-type":"application/json"
            },
            body : JSON.stringify({ id , name , isRequired , selectedMenuIds })
        })
        const { addonCategory , menuAddonCategories} = await response.json();
        thunkApi.dispatch(replaceAddonCategory(addonCategory));
        thunkApi.dispatch(replaceMenuAddonCategories(menuAddonCategories));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

const addonCategorySlice = createSlice({
    name : "addonCategorySlice",
    initialState,
    reducers : {
        setAddonCategory : (state , action) => {
            state.items = action.payload;
        },
        addAddonCategory : (state , action) => {
            state.items = [...state.items , action.payload];
        },
        removeAddonCategory : (state , action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        replaceAddonCategory : (state , action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }
    }
})

export const {setAddonCategory , addAddonCategory , removeAddonCategory , replaceAddonCategory} = addonCategorySlice.actions;

export default addonCategorySlice.reducer;