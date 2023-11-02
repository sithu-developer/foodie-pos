import { Table } from "@prisma/client";

export interface TalbeSliceInitialState {
    items : Table[]
    isLoading : boolean
    error : Error | null
}

