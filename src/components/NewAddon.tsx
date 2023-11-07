import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createAddon } from "@/store/slices/addonSlice"
import { setOpenSnackbar } from "@/store/slices/snackbarSlice"
import { NewAddonOptions } from "@/types/addon"
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { AddonCategory } from "@prisma/client"
import { useState } from "react"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const defaultNewAddon = {name : "" , price : 0 , addonCategoryId : undefined}

const NewAddon = ({open , setOpen } : Props) => {
    const addonCategories = useAppSelector(state => state.addonCategory.items);
    const [newAddon , setNewAddon ] = useState<NewAddonOptions>(defaultNewAddon);
    const dispatch = useAppDispatch();

    const handleCreateAddon = () => {
        dispatch(createAddon({
            ...newAddon ,
            onSuccess : () =>{
               dispatch(setOpenSnackbar({ message : " New Addon is created successfully " }));
               setOpen(false);
               setNewAddon(defaultNewAddon);
            }
        }))
    }

    const handleOnChange = (event : SelectChangeEvent<number>) => {
        setNewAddon({...newAddon , addonCategoryId : Number(event.target.value)})
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewAddon(defaultNewAddon)
        }} >
            <DialogTitle>Addon</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px" , width : "300px"}}>
                <TextField placeholder="name" onChange={(event) => setNewAddon({...newAddon , name : event.target.value })} />
                <TextField placeholder="price" onChange={(event) => setNewAddon({...newAddon , price : Number(event.target.value) })} />
                <FormControl>
                    <InputLabel>Addon Category</InputLabel>
                    <Select
                        label="Addon Category"
                        value={newAddon.addonCategoryId}
                        onChange={handleOnChange}
                        renderValue={(addonCategoryId) => {
                            const addon = addonCategories.find(item => item.id === addonCategoryId);
                            if(addon) return addon.name;
                        }}
                    >
                        {addonCategories.map(item => <MenuItem key={item.id} value={item.id} >
                            <ListItemText primary={item.name} />
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <Box sx={{ display : "flex " , justifyContent :"flex-end" , gap : "20px"}}>
                    <Button variant="contained" onClick={() => {
                        setOpen(false);
                        setNewAddon(defaultNewAddon)
                    }} >Cancel</Button>
                    <Button variant="contained" onClick={handleCreateAddon} disabled={!(newAddon.name && newAddon.addonCategoryId)} >Create</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewAddon;