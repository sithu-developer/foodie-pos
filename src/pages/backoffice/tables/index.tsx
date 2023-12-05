import NewTable from "@/components/NewTable";
import ItemPaper from "@/components/ItemPage";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TableBarIcon from '@mui/icons-material/TableBar';

const TablesPage = () => {
    const [open , setOpen ] = useState<boolean>(false);
    const tables = useAppSelector(store => store.table.items);
    const currentLocationTables = tables.filter(item => item.locationId === Number(localStorage.getItem("selectedLocationId")))

    const handlePrintQRCode = (assetUrl : string) => {
        const imageWindow =  window.open("");
        imageWindow?.document.write(
            `<!DOCTYPE html><html lang="en"><head><title>Print image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print(); window.close()" /></body></html>`
        )
        imageWindow?.document.close() // ask why this close is for ?
    }

    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "space-between"}}>
                <Typography variant="h5" color="primary.main" >Tables</Typography>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Table</Button>
            </Box>
            <NewTable open={open} setOpen={setOpen} />
            <Box sx={{ display : "flex" , flexWrap : "wrap " , gap :"20px", mt : "20px" , justifyContent : { xs : "center" , sm : "flex-start"} }}>
                {currentLocationTables.map(element => <Box key={element.id} sx={{display : "flex" , flexDirection : "column" , gap : "10px"}}>
                    <ItemPaper key={element.id} icon={<TableBarIcon/>} title={element.name} href={`/backoffice/tables/${element.id}`} /> 
                    <Button variant="contained" onClick={() => handlePrintQRCode(element.assetUrl)}>Print OR Code</Button>
                </Box>
                )}
            </Box>
        </Box>
        )
}

export default TablesPage;