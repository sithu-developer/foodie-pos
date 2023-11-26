import NewLocation from "@/components/NewLocation";
import ItemCard from "@/components/ItemCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { setSelectedLocation } from "@/store/slices/locationSlice";

const LocationsPage = () => {
    const dispatch = useAppDispatch();
    const [open , setOpen ] = useState<boolean>(false);
    const {items : locations , selectedLocation} = useAppSelector(store => store.location);
    // const selectedLocation = useAppSelector(state => state.location.selectedLocation);

    if(!locations || !selectedLocation) return null;
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "space-between"}}>
                <Typography variant="h5" color="primary.main" >Locations</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Location</Button>    
            </Box>
            <Box sx={{display : "flex", flexWrap : "wrap", gap : "20px", mt : "10px"}}>
                {locations.map(element => <ItemCard key={element.id} selected={selectedLocation.id === element.id} icon={<LocationOnIcon />} title={element.name} onClick={() => {
                    dispatch(setSelectedLocation(element));
                    localStorage.setItem("selectedLocationId" , String(element.id));
                }} /> )}
            </Box>
            <NewLocation open={open} setOpen={setOpen} /> 
        </Box>
        );
}

export default LocationsPage;