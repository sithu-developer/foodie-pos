import { CreateNewLocationOption, LocationSliceInitialState } from "@/types/location";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : LocationSliceInitialState = {
    items : [],
    isLoading : false,
    error : null
}

export const createNewLocation = createAsyncThunk("locationSlice/createNewLocation", async(options : CreateNewLocationOption , thunkApi) => {
    const {onSuccess, onError, name, address} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/locations` , {
            method : "POST",
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({name , address})
        });
        const newLocationCreated = await response.json();
        thunkApi.dispatch(addLocation(newLocationCreated));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

const locationSlice = createSlice({
    name : "locationSlice",
    initialState,
    reducers : {
        setLocation : (state , action) => {
            state.items = action.payload;
        },
        addLocation : (state , action) => {
            state.items = [...state.items , action.payload ];
        }
    }
})

export const {setLocation , addLocation} = locationSlice.actions;

export default locationSlice.reducer;