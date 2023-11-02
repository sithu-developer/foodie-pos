import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuCategorySliceInitialState {
    items : MenuCategory[]
    isLoading : boolean
    error : Error | null
}


export interface CreateMenuCategoryOption extends BaseOptions {
    name : string;
    locationId : number;
}