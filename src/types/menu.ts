import {Menu} from "@prisma/client"
import { BaseOptions } from "./app"

export interface MenuSliceInitialState {
    items : Menu[]
    isLoading : boolean
    error : Error | null
}


export interface GetMenusOption extends BaseOptions {
    locationId : string
}

export interface CreateNewMenuOption extends BaseOptions {
    name : string;
    price : number
    selectedMenuCategoryIds : number[];
    assetUrl ?: string;
}

export interface UpdateMenuOption extends BaseOptions {
    id : number;
    name: string;
    price: number;
    selectedMenuCategoryIds: number[];
    isAvailable : boolean;
    locationId : number;
}

export interface DeleteMenuOption extends BaseOptions {
    id : number;
}