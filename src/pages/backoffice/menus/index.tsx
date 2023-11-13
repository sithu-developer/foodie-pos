import NewMenu from "@/components/NewMenu";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import MenuCard from "@/components/MenuCard";

const MenusPage = () => {
    const [open , setOpen] = useState<boolean>(false);
    const menus = useAppSelector(store => store.menu.items)
    const disableLocationMenus = useAppSelector(state => state.disabledLocationMenu.items)
    
    return (
        <Box>
            <Box sx={{display : "flex", justifyContent : "flex-end"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }} >New Menu</Button>    
            </Box>
            <Box sx={{display :"flex", flexWrap : "wrap" , mt : "20px" , gap : "20px"}}>
                {menus.map(menu => {
                    const existDisable = disableLocationMenus.find(item => item.menuId === menu.id && item.locationId === Number(localStorage.getItem("selectedLocationId")))
                    return <MenuCard key={menu.id} isAvailable={existDisable ? false : true}  href={`/backoffice/menus/${menu.id}`} menu={menu}  /> 
                } )}
            </Box>
            <NewMenu open={open} setOpen={setOpen} />
        </Box>
        )
}

export default MenusPage;