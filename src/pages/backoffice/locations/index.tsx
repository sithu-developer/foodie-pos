import NewLocation from "@/components/NewLocation";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationsPage = () => {
    const [open , setOpen ] = useState<boolean>(false);
    const locations = useAppSelector(store => store.location.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Location</Button>    
            </Box>
            <Box sx={{display : "flex", flexWrap : "wrap", gap : "20px", mt : "10px"}}>
                {locations.map(element => <ItemCard key={element.id} icon={<LocationOnIcon />} title={element.name}/>)}
            </Box>
            <NewLocation open={open} setOpen={setOpen} /> 
        </Box>
        );
}

export default LocationsPage;