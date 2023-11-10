import NewMenu from "@/components/NewMenu";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuCard from "@/components/MenuCard";

const MenusPage = () => {
    const [open , setOpen] = useState<boolean>(false);
    const menus = useAppSelector(store => store.menu.items)
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Menu</Button>    
            </Box>
            <Box sx={{display :"flex", flexWrap : "wrap" , mt : "20px" , gap : "20px"}}>
                {menus.map(element => {
                    if(element.assetUrl) return <MenuCard key={element.id} price={element.price} assetUrl={element.assetUrl} href={`/backoffice/menus/${element.id}`} title={element.name}  /> 
                    return <ItemCard key={element.id} href={`/backoffice/menus/${element.id}`} title={element.name} icon={<RestaurantMenuIcon/>} />
                } )}
            </Box>
            <NewMenu open={open} setOpen={setOpen} />  
        </Box>
        )
}

export default MenusPage;