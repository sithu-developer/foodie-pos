import { Company } from "@prisma/client";
import { BaseOptions } from "./app";

export interface CompanySliceInitialState {
    item : Company | null;
    isLoading : boolean
    error : Error | null
}

export interface UpdateCompanyOptions extends BaseOptions {
    id : number ;
    name : string;
    street : string;
    township : string;
    city : string;
}
