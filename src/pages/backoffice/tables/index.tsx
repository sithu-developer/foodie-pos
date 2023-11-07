import NewTable from "@/components/NewTable";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import TableBarIcon from '@mui/icons-material/TableBar';

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
            <Box sx={{ display : "flex" , flexWrap : "wrap " , gap :"20px", mt : "20px"}}>
                {tables.map(element => <ItemCard key={element.id} icon={<TableBarIcon/>} title={element.name} href={`/backoffice/tables/${element.id}`} />)}
            </Box>
        </Box>
        )
}

export default TablesPage;