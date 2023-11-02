import {Location} from "@prisma/client"
import { BaseOptions } from "./app";

export interface LocationSliceInitialState {
    items : Location[]
    isLoading : boolean
    error : Error | null
}


export interface CreateNewLocationOption extends BaseOptions {
    name : string;
    address : string;
}