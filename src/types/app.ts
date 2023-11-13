export interface AppSlice {
    init : boolean;
    isLoading : boolean
    error : Error | null
}

export interface BaseOptions {
    onSuccess? : (value ?: any) => void;
    onError? : (value ?: any) => void
}

export interface GetAppDataOption extends BaseOptions {
    companyId ?:  number;
    tableId ?: number;
}