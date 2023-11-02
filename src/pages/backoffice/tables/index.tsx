import NewTable from "@/components/NewTable";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const TablesPage = () => {
    const [open , setOpen ] = useState<boolean>(false);
    const tables = useAppSelector(store => store.table.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Table</Button>    
            </Box>
            <NewTable open={open} setOpen={setOpen} />      
            <Box>{tables.map(element => <Typography key={element.id}>{element.name}</Typography>)}</Box>
        </Box> 
        )
}

export default TablesPage;