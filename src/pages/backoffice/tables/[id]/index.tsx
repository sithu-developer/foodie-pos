import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { UpdateTableOptions } from "@/types/table";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetail = () => {
    const router = useRouter();
    const id = Number(router.query.id);

    const tables = useAppSelector(state => state.table.items);
    const table = tables.find(item => item.id === id);
    const [updatedTable , setUpdatedTable] = useState<UpdateTableOptions>();
    const [open , setOpen ] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(table) setUpdatedTable({id: table.id , locationId : table.locationId , name : table.name})
    }, [table])

    if(!table || !updatedTable) return null;

    const handleUpdateTable = () => {
        const isValid = updatedTable.id && updatedTable.name && updatedTable.locationId;
        if(!isValid) dispatch(setOpenSnackbar({ message : "Error , please complete above first !" , severity : "error"}))
        dispatch(updateTable({...updatedTable , onSuccess : () => {
            router.push("/backoffice/tables")
            dispatch(setOpenSnackbar({ message : "Table is updated successfully "}))
        } }))
    }

    const handleDeleteTable = () => {
        dispatch(deleteTable({ id , onSuccess : () => {
            router.push("/backoffice/tables");
            dispatch(setOpenSnackbar({ message : "Table is deleted successfully "}));
        }}))
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px" , mt : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h5">{table.name}</Typography>
                <Button variant="outlined" color="error" onClick={() => setOpen(true)} >Delete</Button>
            </Box>
            <TextField defaultValue={table.name} onChange={(event) => setUpdatedTable({...updatedTable , name : event.target.value })} />
            <Box sx={{display :"flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/tables")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateTable}>Update</Button>
            </Box>
            <DeleteComfirmation handleDelete={handleDeleteTable} item="table" open={open} setOpen={setOpen} />
        </Box>
    )
}
export default TableDetail;