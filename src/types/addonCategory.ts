import {AddonCategory} from "@prisma/client"
import { BaseOptions } from "./app";

export interface AddonCategorySliceInitialState {
    items : AddonCategory[]
    isLoading : boolean
    error : Error | null
}

export interface NewAddonCategoryOptions extends BaseOptions {
    name : string;
    isRequired : boolean;
    selectedMenuIds : number[];
}

export interface DeleteAddonCategoryOptions extends BaseOptions {
    id : number;
}

export interface UpdateAddonCategoryOptions extends BaseOptions {
    id : number ; // ****
    name : string;
    isRequired : boolean;
    selectedMenuIds : number[];
}