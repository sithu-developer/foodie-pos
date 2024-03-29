import NewAddonCategory from "@/components/NewAddonCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ClassIcon from '@mui/icons-material/Class';
import ItemPaper from "@/components/ItemPage";

const AddonCategoriesPage = () => {
    const [open , setOpen]  = useState<boolean>(false);
    const addonCategories = useAppSelector(store => store.addonCategory.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "space-between"}}>
                <Typography variant="h5" color="primary.main" >Addon Categories</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Addon Category</Button>    
            </Box>
            <NewAddonCategory open={open} setOpen={setOpen} />      
            <Box sx={{display : "flex" , flexWrap : "wrap" , gap : "20px" , mt: "20px" , justifyContent : { xs : "center" , sm : "flex-start"} }}>
                {addonCategories.map(element => <ItemPaper key={element.id} title={element.name} icon={<ClassIcon />} href={`/backoffice/addon-categories/${element.id}`} />)}
            </Box>
        </Box>
    )
}

export default AddonCategoriesPage;