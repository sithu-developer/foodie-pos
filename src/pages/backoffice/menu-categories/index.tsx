import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

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
            <Box>{menuCategories.map(element => <Typography key={element.id}>{element.name}</Typography>)}</Box>
            <NewMenuCategory open={open} setOpen={setOpen} />      
        </Box>
    )
}

export default MenuCategoriesPage;