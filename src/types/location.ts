import {Location} from "@prisma/client"
import { BaseOptions } from "./app";

export interface LocationSliceInitialState {
    items : Location[];
    selectedLocation : Location | null;
    isLoading : boolean
    error : Error | null
}


export interface CreateNewLocationOption extends BaseOptions {
    name : string;
    street : string;
    township : string;
    city : string;
}