import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const NewTable = ({open , setOpen } : Props) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} >
            <DialogTitle>Table</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px"}}>
                <TextField placeholder="name" />
                <Button variant="contained" sx={{width : "fit-content", margin : "0 auto"}}>Create</Button>
            </DialogContent>
        </Dialog>
    )
}

export default NewTable;