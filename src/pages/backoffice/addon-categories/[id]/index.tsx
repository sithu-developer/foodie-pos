import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddonCategory, updateAddonCategory } from "@/store/slices/addonCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateAddonCategoryOptions } from "@/types/addonCategory";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetail = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const dispatch = useAppDispatch();

    // for current Addon Category
    const addonCategories = useAppSelector(state => state.addonCategory.items);
    const currentAddonCategory = addonCategories.find(item => item.id === id);

    //for selectedMenuIds
    const allMenuAddonCategories = useAppSelector(state => state.menuAddonCategory.items);
    const menuAddonCategories = allMenuAddonCategories.filter(item => item.addonCategoryId === id)
    const selectedMenuIds  = menuAddonCategories.map(item => item.menuId);
    
    const menus = useAppSelector(state => state.menu.items);

    // states
    const [open , setOpen] = useState<boolean>(false)
    const [updatedAddonCategory , setUpdatedAddonCategory] = useState<UpdateAddonCategoryOptions>();

    useEffect(() => {
        if(currentAddonCategory) setUpdatedAddonCategory({ id  , name : currentAddonCategory.name , isRequired : currentAddonCategory.isRequired , selectedMenuIds });
    } , [currentAddonCategory]);


    if(!(currentAddonCategory && updatedAddonCategory)) return null;

    const handleOnChange = (event : SelectChangeEvent<number[]>) => {
        const selectedMenuIds = event.target.value as number[];
        setUpdatedAddonCategory({...updatedAddonCategory , selectedMenuIds })
    }


    const handleDeleteAddonCategory = () => {
        dispatch(deleteAddonCategory({
            id ,
            onSuccess : () => {
                router.push("/backoffice/addon-categories");
                dispatch(setOpenSnackbar({message : "AddonCategory is deleted successfully"}))
            }
        }));
    }

    const handleUpdateAddonCategory = () => {
        const isValid = updatedAddonCategory.name && updatedAddonCategory.selectedMenuIds.length > 0;
        if(!isValid) dispatch(setOpenSnackbar({message : "Can't not update, please complete the above first !" , severity : "error"}))
        dispatch(updateAddonCategory({
            ...updatedAddonCategory ,
             onSuccess : () => {
                router.push("/backoffice/addon-categories");
                dispatch(setOpenSnackbar({message : "AddonCategory is updated successfully"}))
            }
        }));
    }

    return (
        <Box sx={{ display : "flex " , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{display : "flex" , justifyContent : "flex-end "}}>
                <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete</Button>
            </Box>
            <TextField defaultValue={currentAddonCategory.name} onChange={(event) => setUpdatedAddonCategory({...updatedAddonCategory , name : event.target.value})} />
            <FormControl>
                <InputLabel>menus</InputLabel>
                <Select 
                    label="menus"
                    multiple value={updatedAddonCategory.selectedMenuIds}
                    renderValue={selectedMenuIds => {
                        return <Box sx={{display :"flex" , gap: "4px", flexWrap: "wrap"}}>
                        {selectedMenuIds.map(selectedMenuId => {
                            const menu = menus.find(menu => menu.id === selectedMenuId) as Menu;
                            return <Chip key={menu.id} label={menu.name} />
                        })}
                        </Box>
                    }}
                    MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                          },
                        },
                      }}
                    onChange={handleOnChange}
                >
                    {menus.map(item => <MenuItem key={item.id} value={item.id} >
                        <Checkbox checked={updatedAddonCategory.selectedMenuIds.includes(item.id)} />
                        <ListItemText primary={item.name} />
                    </MenuItem>)}
                </Select>
            </FormControl>
            <Box>
                <FormControlLabel control={<Checkbox defaultChecked={currentAddonCategory.isRequired} />} label="is required" onChange={( _ , value)=> setUpdatedAddonCategory({...updatedAddonCategory , isRequired : value})} />
            </Box>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/addon-categories")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateAddonCategory}>Update</Button>
            </Box>
            <DeleteComfirmation open={open} setOpen={setOpen} item="addon category" handleDelete={handleDeleteAddonCategory} />
        </Box>
    )
}

export default AddonCategoryDetail;