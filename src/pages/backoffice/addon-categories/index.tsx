import NewAddonCategory from "@/components/NewAddonCategory";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ClassIcon from '@mui/icons-material/Class';

const AddonCategoriesPage = () => {
    const [open , setOpen]  = useState<boolean>(false);
    const addonCategories = useAppSelector(store => store.addonCategory.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Addon Category</Button>    
            </Box>
            <NewAddonCategory open={open} setOpen={setOpen} />      
            <Box sx={{display : "flex" , flexWrap : "wrap" , gap : "20px" , mt: "20px"}}>
                {addonCategories.map(element => <ItemCard key={element.id} title={element.name} icon={<ClassIcon />} href={`/backoffice/addon-categories/${element.id}`} />)}
            </Box>
        </Box>
    )
}

export default AddonCategoriesPage;