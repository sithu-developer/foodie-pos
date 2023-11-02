import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonsPage = () => {
    const [open , setOpen ] = useState<boolean>(false);
    const addons = useAppSelector(store => store.addon.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Addon</Button>    
            </Box>
            <Box>{addons.map(element => <Typography key={element.id}>{element.name}</Typography>)}</Box>
            <NewAddon open={open} setOpen={setOpen} />      
        </Box>   
        )
}

export default AddonsPage;