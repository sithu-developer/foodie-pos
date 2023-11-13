import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "./slices/menuSlice"
import appReducer from "./slices/appSlice"
import menuCategoryReducer from "./slices/menuCategorySlice"
import addonReducer from "./slices/addonSlice"
import addonCategoryReducer from "./slices/addonCategorySlice"
import locationReducer from "./slices/locationSlice"
import tableReducer from "./slices/tableSlice"
import menuCategoryMenuReducer from "./slices/menuCategoryMenuSlice"
import menuAddonCategoryReducer from "./slices/menuAddonCategorySlice"
import snackbarReducer from "./slices/snackbarSlice"
import disabledLocationMenuCategoryReducer from "./slices/disabledLocationMenuCategorySlice"
import disabledLocationMenuReducer from "./slices/disabledLocationMenuSlice"

export const store = configureStore({
  reducer: {
    app : appReducer,
    location : locationReducer,
    menu : menuReducer,
    menuCategory : menuCategoryReducer,
    menuCategoryMenu : menuCategoryMenuReducer,
    menuAddonCategory : menuAddonCategoryReducer,
    addonCategory : addonCategoryReducer,
    addon : addonReducer,
    table : tableReducer,
    snackbar : snackbarReducer,
    disabledLocationMenuCategory : disabledLocationMenuCategoryReducer,
    disabledLocationMenu : disabledLocationMenuReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch