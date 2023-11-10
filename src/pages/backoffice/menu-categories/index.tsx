import NewMenuCategory from "@/components/NewMenuCategory";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import CategoryIcon from '@mui/icons-material/Category';

const MenuCategoriesPage = () => {
    const [open, setOpen] = useState<boolean>(false)
    const menuCategories = useAppSelector(state => state.menuCategory.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Menu Category</Button>    
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px" , mt : "20px"}}>
                {menuCategories.map(element => <ItemCard key={element.id} icon={<CategoryIcon/>} title={element.name} href={`/backoffice/menu-categories/${element.id}`} />)}
            </Box>
            <NewMenuCategory open={open} setOpen={setOpen} />      
        </Box>
    )
}

export default MenuCategoriesPage;