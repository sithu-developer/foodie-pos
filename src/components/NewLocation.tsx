import { useAppDispatch } from "@/store/hooks"
import { createNewLocation } from "@/store/slices/locationSlice"
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const NewLocation = ({open , setOpen } : Props) => {
    const [newLocation , setNewLocation] = useState({name : "", address : ""});
    const dispatch = useAppDispatch();

    const onSuccess = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewLocation({name : "", address : ""});
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
                        setNewLocation({name : "", address : ""});
                    } } >Cancel</Button>
                    <Button variant="contained" disabled={newLocation.name && newLocation.address ? false : true} onClick={() => {
                        dispatch(createNewLocation({...newLocation , onSuccess}));
                    }}  >Comfirm</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewLocation;