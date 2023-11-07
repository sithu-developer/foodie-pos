import { Table } from "@prisma/client";
import { BaseOptions } from "./app";

export interface TalbeSliceInitialState {
    items : Table[]
    isLoading : boolean
    error : Error | null
}

export interface UpdateTableOptions extends BaseOptions {
    id : number ;
    name : string;
    locationId : number;
}

export interface DeleteTableOptions extends BaseOptions {
    id : number;
}

export interface NewTableOptions extends BaseOptions {
    name : string;
    locationId : number | undefined;
}