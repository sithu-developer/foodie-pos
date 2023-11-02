import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetSnackbar } from "@/store/slices/snackbarSlice";
import { Alert , Snackbar as MuiSnackBar } from "@mui/material"

const Snackbar = () => {
    const {autoHideDuration , message , open , severity} = useAppSelector(state => state.snackbar)
    const dispatch = useAppDispatch();
    return (
        <MuiSnackBar open={open} autoHideDuration={autoHideDuration} onClose={() => dispatch(resetSnackbar())} anchorOrigin={{horizontal : "right" , vertical : "bottom"}} >
          <Alert onClose={() => dispatch(resetSnackbar())} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </MuiSnackBar>
    )
}

export default Snackbar;