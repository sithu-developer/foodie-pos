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
import { setDisabledLocationMenuCategory } from "./disabledLocationMenuCategorySlice";
import { setDisabledLocationMenu } from "./disabledLocationMenuSlice";

const initialState : AppSlice = {
    init : false,
    isLoading : false,
    error : null
}

export const fetchGetAppData = createAsyncThunk("appSlice/getAppData", async( options : GetAppDataOption , thunkApi) => {
    const { companyId , tableId } = options;
    try {
        const appDataUrl = companyId && tableId ? `${config.apiBaseUrl}/app?companyId=${companyId}&tableId=${tableId}`
        : `${config.apiBaseUrl}/app`;
        const response = await fetch(appDataUrl);
        const appData = await response.json();
        const {          
            menuCategories,
            menus,
            menuCategoryMenus,
            addonCategories,
            addons,
            menuAddonCategories,
            locations,
            tables ,
            disabledLocationMenuCategories,
            disabledLocationMenus} = appData;
        thunkApi.dispatch(setInit(true));
        thunkApi.dispatch(setMenuCategories(menuCategories));
        thunkApi.dispatch(setMenus(menus));
        thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenus));
        thunkApi.dispatch(setAddonCategory(addonCategories));
        thunkApi.dispatch(setAddon(addons));
        thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
        thunkApi.dispatch(setLocation(locations));
        thunkApi.dispatch(setTable(tables));
        thunkApi.dispatch(setDisabledLocationMenuCategory(disabledLocationMenuCategories));
        thunkApi.dispatch(setDisabledLocationMenu(disabledLocationMenus));
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