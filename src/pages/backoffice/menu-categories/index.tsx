import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import ItemPaper from "@/components/ItemPage";

const MenuCategoriesPage = () => {
    const [open, setOpen] = useState<boolean>(false)
    const menuCategories = useAppSelector(state => state.menuCategory.items);
    const disabledLocationMenuCategories = useAppSelector(state => state.disabledLocationMenuCategory.items);
 
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "space-between"}}>
                <Typography variant="h5" color="primary.main" >Menu Categories</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Menu Category</Button>    
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px" , mt : "20px" , justifyContent : { xs : "center" , sm : "flex-start"} }}>
                {menuCategories.map(element =>  {
                    const disabledLocationMenuCategory = disabledLocationMenuCategories.find(item => item.locationId === Number(localStorage.getItem("selectedLocationId")) && item.menuCategoryId === element.id)
                    return (
                        <ItemPaper key={element.id} isAvailable={disabledLocationMenuCategory ? false : true } icon={<CategoryIcon/>} title={element.name} href={`/backoffice/menu-categories/${element.id}`} />
                        )
                    }
                )}
            </Box>
            <NewMenuCategory open={open} setOpen={setOpen} />      
        </Box>
    )
}

export default MenuCategoriesPage;