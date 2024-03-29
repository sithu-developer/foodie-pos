import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu, updateMenu } from "@/store/slices/menuSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateMenuOption } from "@/types/menu";
import { config } from "@/utils/config";
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateMenu = () => {
    const [open , setOpen ] = useState<boolean>(false)
    const router = useRouter();
    const menuId = Number(router.query.id);

    const menuCategories = useAppSelector(state => state.menuCategory.items)
    const menus = useAppSelector(state => state.menu.items);
    const disabledLocationMenus = useAppSelector(state => state.disabledLocationMenu.items);
    

    const menu = menus.find(item => item.id === menuId );
    const allMenuCategoryMenus = useAppSelector(state => state.menuCategoryMenu.items);
    const menuCategoryMenus = allMenuCategoryMenus.filter(item => item.menuId === menuId);
    const selectedMenuCategoryIds = menuCategoryMenus.map(item => item.menuCategoryId);
    
    const [loading , setLoading ] = useState(false)
    const [updatedMenu , setUpdatedMenu] = useState<UpdateMenuOption>();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(menu && disabledLocationMenus) {
            const existDisable = disabledLocationMenus.find(item => item.menuId === menuId && item.locationId === Number(localStorage.getItem("selectedLocationId")));
            setUpdatedMenu({...menu,selectedMenuCategoryIds , isAvailable : existDisable ? false : true , locationId : Number(localStorage.getItem("selectedLocationId"))  }) 
        }
    }, [menu , disabledLocationMenus])

    if(!menu || !updatedMenu) return null; 

    const handleOnChange = (event : SelectChangeEvent<number[]>) => {
        const selectedMenuCategoryIds = event.target.value as number[];
        setUpdatedMenu({...updatedMenu, id : menuId, selectedMenuCategoryIds });
    }

    const handleUpdateMenu = () => {
        const isValid = updatedMenu.name && updatedMenu.price && updatedMenu.selectedMenuCategoryIds.length > 0 ;
        if(!isValid) dispatch(setOpenSnackbar({message : "Error , please complete the above first ! " , severity : "error"}))
        dispatch(updateMenu({
            ...updatedMenu,
            id : menuId,
            locationId : Number(localStorage.getItem("selectedLocationId")),
            onSuccess : () => {
                router.push("/backoffice/menus");
                dispatch(setOpenSnackbar({ message : "menu is updated successfully "}))
            } 
        }));
    }

    const handleDeleteMenu = () => {
        dispatch(deleteMenu({
            id : menuId ,
             onSuccess : () => {
                router.push("/backoffice/menus");
                dispatch(setOpenSnackbar({ message : "menu is deleted successfully "}))
            }
        }));
    }

    const handleMenuImageUpload = async(event : ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files) {
            const file = files[0];
            if(file) setLoading(true)
            const formData = new FormData();
            formData.append("files" , file);
            const response = await fetch(`${config.apiBaseUrl}/assets` , {
                method : "POST",
                body : formData
            })
            const { assetUrl } = await response.json();
            dispatch(updateMenu({...updatedMenu , assetUrl , onSuccess : () => setLoading(false) }))
        }
    }
   
    return (
        <Box sx={{display : "flex", flexDirection : "column", gap : "20px"}}>
            <Box sx={{display : "flex", justifyContent : "space-between"}} >
            <Typography variant="h5">{menu.name}</Typography>
                <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete</Button>
            </Box>
            <Box sx={{ display : "flex" , flexDirection : "column" , alignItems : "center" , gap : "10px"}}>
                <Image alt="menu-image" src={menu.assetUrl || "/default-menu.png"} width={200} height={0} style={{ height : "auto"}} />
                <Button variant="contained" component="label" >
                    Upload File
                    <input type="file" hidden onChange={handleMenuImageUpload}/>
                    {loading && <CircularProgress sx={{ml : "10px" , fontSize : "20px"}} color="inherit"/>}
                </Button>
            </Box>
            <TextField defaultValue={menu.name} onChange={(event) => setUpdatedMenu({...updatedMenu , id : menuId , name : event.target.value })} />
            <TextField defaultValue={menu.price} onChange={(event) => setUpdatedMenu({...updatedMenu ,id : menuId, price : Number(event.target.value) })} />
            <FormControl>
                <InputLabel>Menu Categories</InputLabel>
                <Select 
                    multiple 
                    value={updatedMenu.selectedMenuCategoryIds} 
                    label="Menu Categories" onChange={handleOnChange}
                    renderValue={(selectedMenuCategoryIds) => {
                        const names = selectedMenuCategoryIds.map(selectedMenuCategoryId => {
                            const menuCategory = menuCategories.find(item => item.id === selectedMenuCategoryId);
                            if(menuCategory) return menuCategory.name;
                        });
                        return names.join(" , ");
                    }}
                    
                >
                    {menuCategories.map(item => <MenuItem key={item.id} value={item.id} >
                        <Checkbox checked={updatedMenu.selectedMenuCategoryIds?.includes(item.id)} />
                        <ListItemText primary={item.name} />
                    </MenuItem> )}
                </Select>
            </FormControl>
            <Box>
                <FormControlLabel control={<Switch defaultChecked={updatedMenu.isAvailable} />} label="Available" onChange={( _ , value) => setUpdatedMenu({...updatedMenu , isAvailable : value}) } />
            </Box>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/menus")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateMenu} >Update</Button>
            </Box>
            
            <DeleteComfirmation open={open} setOpen={setOpen} item="menu" handleDelete={handleDeleteMenu} />
        </Box>
    )

}

export default UpdateMenu;