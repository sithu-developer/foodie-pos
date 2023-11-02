import { useAppDispatch } from "@/store/hooks"
import { createMenuCategory } from "@/store/slices/menuCategorySlice"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const NewMenuCategory = ({open , setOpen } : Props) => {
    const dispatch = useAppDispatch();
    const [name , setName] = useState("");
    
    const onSuccess = () => {
        setOpen(false);
    }

    const handleCreateMenuCategory = () => {
        const selectedLocationId = localStorage.getItem("selectedLocationId") 
        dispatch(createMenuCategory( { name , locationId : Number(selectedLocationId) , onSuccess }))
    };

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setName("");
            }} >
            <DialogTitle>Menu Category</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px"}}>
                <Box sx={{mt : 1}}>
                    <TextField label="name" autoFocus onChange={(event) => {
                        setName(event.target.value);
                    }} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={{ margin : "0 auto"}} onClick={() => {
                    setOpen(false);
                    setName("");
                    }}>Cancel</Button>
                <Button variant="contained" sx={{ margin : "0 auto"}} disabled={!name} onClick={() => handleCreateMenuCategory()} >Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewMenuCategory;