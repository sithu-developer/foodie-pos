import {Addon} from "@prisma/client"
import { BaseOptions } from "./app";

export interface AddonSliceInitialState {
    items : Addon[]
    isLoading : boolean
    error : Error | null
}

export interface UpdateAddonOptions extends BaseOptions {
    id : number;
    name : string;
    price : number;
    addonCategoryId : number;
}

export interface DeleteAddonOptions extends BaseOptions {
    id : number;
}

export interface NewAddonOptions extends BaseOptions {
    name : string;
    price : number;
    addonCategoryId? : number;
}

