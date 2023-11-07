import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateAddonOptions } from "@/types/addon";
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const AddonDetails = () => {
    const router = useRouter();
    const addonId = Number(router.query.id);

    const allAddons = useAppSelector(state => state.addon.items);
    const addon = allAddons.find(item => item.id === addonId);

    const addonCategories = useAppSelector(state => state.addonCategory.items)
    const [updatedAddon , setUpdatedAddon ] = useState<UpdateAddonOptions>();
    const [open , setOpen ] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(addon)
        setUpdatedAddon({ id : addon.id , name : addon.name , price : addon.price , addonCategoryId : addon.addonCategoryId})
    }, [addon])

    if(!(addon && updatedAddon)) return null;

    const handleOnChange = (event : SelectChangeEvent<number>) => {
        const addonCategoryId = Number(event.target.value)
        setUpdatedAddon({...updatedAddon, addonCategoryId});
    }

    const handleUpdateAddon = () => {
        const isValid = updatedAddon.name && updatedAddon.addonCategoryId;
        if(!isValid) dispatch(setOpenSnackbar({ message : "Error , please complete above first ! " , severity : "error"}))
        dispatch(updateAddon( {
            ...updatedAddon ,
            onSuccess : () => {
                router.push("/backoffice/addons");
                dispatch(setOpenSnackbar({message : " Addon is updated successfully " }));
            }
        }))
    }

    const handleDeleteAddon = () => {
        dispatch(deleteAddon({  
            id : addonId ,
            onSuccess : () => {
              router.push("/backoffice/addons");
              dispatch(setOpenSnackbar({ message : "Addon is deleted successfully "}))
            }
         }))
    }

    return (
        <Box sx={{display :"flex" , flexDirection : "column" , gap :"20px"}}>
            <Box sx={{display : "flex " , justifyContent : "space-between"}}>
                <Typography variant="h5">{addon.name}</Typography>
                <Button variant="outlined" color="error" onClick={() => setOpen(true)} >Delete</Button>
            </Box>
            <TextField defaultValue={addon.name} onChange={(event) => setUpdatedAddon({...updatedAddon , name : event.target.value}) } />
            <TextField defaultValue={addon.price} onChange={(event) => setUpdatedAddon({...updatedAddon, price : Number(event.target.value)})} />
            <FormControl >
                <InputLabel>Addon Category</InputLabel>
                <Select label="Addon Category"
                 value={updatedAddon.addonCategoryId}
                 onChange={handleOnChange}
                 renderValue={(addonCategoryId) => {
                    const addonCategory = addonCategories.find(item => item.id === addonCategoryId);
                    if(addonCategory) return addonCategory.name;
                 }}
                  >
                    {addonCategories.map(item => <MenuItem key={item.id} value={item.id} >
                        <ListItemText primary={item.name} />
                    </MenuItem>)}
                </Select>
            </FormControl>
            <Box sx={{ display :"flex" ,  gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/addons") } >Cancel</Button>
                <Button variant="contained" onClick={handleUpdateAddon} >Update</Button>
            </Box>
            <DeleteComfirmation handleDelete={handleDeleteAddon}  item="addon" open={open} setOpen={setOpen} />
        </Box>
    )
}

export default AddonDetails;