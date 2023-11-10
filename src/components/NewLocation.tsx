import { useAppDispatch } from "@/store/hooks"
import { createNewLocation } from "@/store/slices/locationSlice"
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"
import { config } from "@/utils/config"
import { setOpenSnackbar } from "@/store/slices/snackbarSlice"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const defaultLocation = {name : "", address : ""}

const NewLocation = ({open , setOpen } : Props) => {
    const [newLocation , setNewLocation] = useState(defaultLocation);
    const dispatch = useAppDispatch();

    const onSuccess = () => {
        setOpen(false);
        dispatch(setOpenSnackbar({ message : "New location is created successfully"}))
    }


    const handleCreateLocation = async() => {
        dispatch(createNewLocation({...newLocation , onSuccess}));
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewLocation(defaultLocation);
        }} >
            <DialogTitle>Location</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px", width :"400px"}}>
                <TextField placeholder="Name" onChange={(event) => {
                    setNewLocation({...newLocation , name : event.target.value })
                }} />
                <TextField placeholder="Address" onChange={(event) => {
                    setNewLocation({...newLocation , address : event.target.value })
                }} />
                <Box sx={{display :"flex", justifyContent : "flex-end", gap : "20px"}}>
                    <Button variant="contained" onClick={() => {
                        setOpen(false);
                        setNewLocation(defaultLocation);
                    } } >Cancel</Button>
                    <Button variant="contained" disabled={newLocation.name && newLocation.address ? false : true} onClick={handleCreateLocation} 
                    >Comfirm</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewLocation;