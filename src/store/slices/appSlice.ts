import { AppSlice, GetAppDataOption } from "@/types/app";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLocation } from "./locationSlice";
import { setMenus } from "./menuSlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setMenuCategories } from "./menuCategorySlice";
import { setAddon } from "./addonSlice";
import { setTable } from "./tableSlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { setMenuAddonCategories } from "./menuAddonCategorySlice";

const initialState : AppSlice = {
    init : false,
    isLoading : false,
    error : null
}

export const fetchGetAppData = createAsyncThunk("appSlice/getAppData", async( _ , thunkApi) => {
    // const {onSuccess, onError, locationId} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/app`);
        const appData = await response.json();
        const {          
            menuCategories,
            menus,
            menuCategoryMenus,
            addonCategories,
            addons,
            menuAddonCategories,
            locations,
            tables} = appData;
        thunkApi.dispatch(setInit(true));
        thunkApi.dispatch(setMenuCategories(menuCategories));
        thunkApi.dispatch(setMenus(menus));
        thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenus));
        thunkApi.dispatch(setAddonCategory(addonCategories));
        thunkApi.dispatch(setAddon(addons));
        thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
        thunkApi.dispatch(setLocation(locations));
        thunkApi.dispatch(setTable(tables));

        // onSuccess && onSuccess();
    } catch (err) {
        // onError && onError();
    }
})

const appSlice = createSlice({
    name : "appSlice",
    initialState,
    reducers : {
        setInit : (state , action) => {
            state.init = action.payload;
        }
    }
})

export const {setInit} = appSlice.actions;
export default appSlice.reducer;