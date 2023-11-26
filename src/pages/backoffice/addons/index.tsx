import NewAddon from "@/components/NewAddon";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const AddonsPage = () => {
    const [open , setOpen ] = useState<boolean>(false);
    const addons = useAppSelector(store => store.addon.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "space-between"}}>
                <Typography variant="h5" color="primary.main" >Addon</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Addon</Button>    
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px" , mt : "20px"}}>
                {addons.map(element => <ItemCard key={element.id} icon={<WaterDropIcon/>} title={element.name} href={`/backoffice/addons/${element.id}`} />)}
            </Box>
            <NewAddon open={open} setOpen={setOpen} />      
        </Box>   
        )
}

export default AddonsPage;