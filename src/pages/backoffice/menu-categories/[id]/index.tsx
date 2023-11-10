import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetAppData } from "@/store/slices/appSlice";
import { deleteMenuCategory, updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const MenuCategoryDetail = () => {
    const router = useRouter();
    const id = Number(router.query.id);

    const menuCategories = useAppSelector(state => state.menuCategory.items);
    const menuCategory = menuCategories.find(item => item.id === id);

    const [updatedMenuCategory ,setUpdatedMenuCategory ] = useState<UpdateMenuCategoryOptions>();
    const [open , setOpen ] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(menuCategory)  // here
        setUpdatedMenuCategory({ id , name : menuCategory.name , locationId : Number(localStorage.getItem("selectedLocationId")) , isAvailable : true})
    } , [menuCategory])

    if(!menuCategory || !updatedMenuCategory) return null;

    const handleUpdateMenuCategory = () => { 
        const isValid = updatedMenuCategory.name && updatedMenuCategory.locationId && updatedMenuCategory.id;
        if(!isValid) dispatch(setOpenSnackbar({ message : "Error , please complete above first ! " , severity : "error"}))
        dispatch(updateMenuCategory({...updatedMenuCategory , locationId : Number(localStorage.getItem("selectedLocationId")) , onSuccess : () => {
            router.push("/backoffice/menu-categories");
            dispatch(setOpenSnackbar({ message : " Menu Category is updated successfully "}))   
        }}))
    }

    const handleDeleteMenuCategory = () => {
        dispatch(deleteMenuCategory({ id , onSuccess : () => {
            router.push("/backoffice/menu-categories");
            dispatch(setOpenSnackbar({ message : "Menu category is deleted successfully "}));
            dispatch(fetchGetAppData());
        }}));
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h5">{menuCategory.name}</Typography>
                <Button variant="outlined" color="error" onClick={() => setOpen(true)} >Delete</Button>
            </Box>
            <TextField defaultValue={menuCategory.name} onChange={(event) => setUpdatedMenuCategory({...updatedMenuCategory , name : event.target.value })} />
            <FormControlLabel control={<Switch defaultChecked onChange={( _ , value) => setUpdatedMenuCategory({...updatedMenuCategory , isAvailable : value })} />} label="Available" />
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/menu-categories")} >Cancel</Button>
                <Button variant="contained" onClick={handleUpdateMenuCategory} >Update</Button>
            </Box>
            <DeleteComfirmation handleDelete={handleDeleteMenuCategory} item="menu category" open={open} setOpen={setOpen} />
        </Box>
    )
}

export default MenuCategoryDetail;