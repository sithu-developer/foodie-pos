import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setOpenSnackbar } from "@/store/slices/snackbarSlice"
import { createTable } from "@/store/slices/tableSlice"
import { NewTableOptions } from "@/types/table"
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const defaultTable = {name : "" , locationId : undefined}

const NewTable = ({open , setOpen } : Props) => {
    const [newTable , setNewTable ] = useState<NewTableOptions>(defaultTable);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setNewTable({...newTable , locationId :Number(localStorage.getItem("selectedLocationId"))})
    } , [open])

    const handleCreateTable = () => {
        dispatch(createTable({...newTable , onSuccess : () => {
            setOpen(false);
            setNewTable(defaultTable);
            dispatch(setOpenSnackbar({ message : "Table is created successfully "}))
        }}))
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewTable(defaultTable)
        }} >
            <DialogTitle>Create Table</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px" , width : "400px" }}>
                <TextField placeholder="name" onChange={(event) => setNewTable({ ...newTable , name : event.target.value}) } />
                <Box sx={{display : "flex", justifyContent : "flex-end", gap: "20px"}}>
                    <Button variant="contained" onClick={() => {
                        setOpen(false);
                        setNewTable(defaultTable);
                    }}>Cancel</Button>
                    <Button variant="contained" disabled={!newTable.name}  onClick={handleCreateTable} >Comfirm</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewTable;