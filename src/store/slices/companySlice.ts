import { CompanySliceInitialState, UpdateCompanyOptions } from "@/types/company";
import { config } from "@/utils/config";
import { Company } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState : CompanySliceInitialState = {
    item : null,
    isLoading : false,
    error : null
}

export const updateCompany = createAsyncThunk("companySlice/updateCompany" ,async(options : UpdateCompanyOptions , thunkApi) => {
    const {id, name, city , street , township , onError, onSuccess} = options;
    try{ 
        const response = await fetch(`${config.apiBaseUrl}/company`, {
            method : "PUT" ,
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({id , name , city , street , township })
        });
        const { updatedCompany } = await response.json();
        thunkApi.dispatch(setCompany(updatedCompany))
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})


const companySlice = createSlice({
    name : "companySlice",
    initialState,
    reducers : {
        setCompany : (state , action : PayloadAction<Company>) => {
            state.item = action.payload;
        },
    }
})

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;