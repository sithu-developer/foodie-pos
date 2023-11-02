import { useAppSelector } from "@/store/hooks";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

const SettingsPage = () => {
    const locations = useAppSelector(store => store.location.items);
    const [locationId , setLocationId ] = useState< number | string >("");

    useEffect(() => {
      const selectedLocationId = localStorage.getItem("selectedLocationId");
      if (selectedLocationId) {
        setLocationId(selectedLocationId);
      } else {
        const firstLocation = locations[0];
        if(firstLocation) setLocationId(firstLocation.id);
      }
    } , []);

    const handleLocationChange = (evt : SelectChangeEvent<number>) => {
      localStorage.setItem("selectedLocationId", String(evt.target.value));
      setLocationId(evt.target.value);
    };

    if(!locations.length) return null;

    return (
      <Box>
      <FormControl fullWidth>
        <InputLabel>Location</InputLabel>
        <Select
          value={Number(locationId)}
          label="location"
          onChange={handleLocationChange}
        >
        {locations.map(item => 
          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      </Box>
    )
}

export default SettingsPage;