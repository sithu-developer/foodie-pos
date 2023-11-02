type SnackbarSeverity = "success" | "error";

export interface SnackbarSlice {
    open : boolean;
    message : string | null;
    autoHideDuration : number;
    severity : SnackbarSeverity;
}