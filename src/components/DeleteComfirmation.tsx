import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

interface Props {
    item : string;
    open : boolean;
    setOpen : (value : boolean) => void;
    handleDelete : () => void;
}

const DeleteComfirmation = ({item , open , setOpen , handleDelete } : Props) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure that you want to DELETE this {item} ?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteComfirmation;