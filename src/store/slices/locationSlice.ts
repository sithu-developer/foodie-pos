import { CreateNewLocationOption, LocationSliceInitialState } from "@/types/location";
import { config } from "@/utils/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : LocationSliceInitialState = {
    items : [],
    selectedLocation : null,
    isLoading : false,
    error : null
}

export const createNewLocation = createAsyncThunk("locationSlice/createNewLocation", async(options : CreateNewLocationOption , thunkApi) => {
    const {onSuccess, onError, name, township , street , city } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/locations` , {
            method : "POST",
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({ name, township , street , city })
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
        setLocation : (state , action : PayloadAction<Location[]>) => {
            state.items = action.payload;
            const selectedLocationId = localStorage.getItem("selectedLocationId");
            if(!selectedLocationId) {
                const firstLocationId = action.payload[0].id; 
                localStorage.setItem("selectedLocationId" , String(firstLocationId));
                state.selectedLocation = action.payload[0];
            } else {
                const selectedLocation = state.items.find(item => item.id === Number( selectedLocationId));
                if(selectedLocation) state.selectedLocation = selectedLocation;
            }
        },
        addLocation : (state , action) => {
            state.items = [...state.items , action.payload ];
        },
        setSelectedLocation : (state , action : PayloadAction<Location>) => {
            state.selectedLocation = action.payload;
        }
    }
})

export const {setLocation , addLocation , setSelectedLocation } = locationSlice.actions;

export default locationSlice.reducer;