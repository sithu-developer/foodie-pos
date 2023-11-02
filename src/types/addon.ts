import {Addon} from "@prisma/client"

export interface AddonSliceInitialState {
    items : Addon[]
    isLoading : boolean
    error : Error | null
}

