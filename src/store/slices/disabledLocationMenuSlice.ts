import { DisabledLocationMenuSlice } from "@/types/disabledLocationMenu";
import { DisabledLocationMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : DisabledLocationMenuSlice = {
    items : [],
    isLoading : false,
    error : null
}

const disabledLocationMenuSlice = createSlice({
    name : "disabledLocationMenuSlice",
    initialState ,
    reducers : {
        setDisabledLocationMenu : (state , action) => {
            state.items = action.payload;
        },
        addDisabledLocationMenu : (state  , action) => {
            state.items = [...state.items , action.payload]
        },
        removeDisabledLocationMenu : (state , action : PayloadAction<DisabledLocationMenu>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }
    }
})

export const {setDisabledLocationMenu , addDisabledLocationMenu , removeDisabledLocationMenu} = disabledLocationMenuSlice.actions;

export default disabledLocationMenuSlice.reducer;