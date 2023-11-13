import DisplayAddonCategories from "@/components/DisplayAddonCategories";
import QuantityOfItems from "@/components/QuantityOfItems";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material"
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const menuDetailPage = () => {
    const [quantity , setQuantity ] = useState<number>(1);
    const [selectedAddonIds , setSelectedAddonIds ] = useState<number[]>([])
    const router = useRouter()
    const menuId = Number(router.query.id);
    const allMenus = useAppSelector(state => state.menu.items);
    const menu = allMenus.find(menu => menu.id === menuId);
    console.log(selectedAddonIds)

    const allMenuAddonCategories = useAppSelector(state => state.menuAddonCategory.items);
    const addonCategoryIds = allMenuAddonCategories.filter(item => item.menuId === menuId).map(item => item.addonCategoryId);
    const addonCategories = useAppSelector(state => state.addonCategory.items).filter(item => addonCategoryIds.includes(item.id));
    
    
    if(!menu) return null;
    return (
        <Box sx={{ display : "flex" ,gap : "20px", flexDirection : "column", justifyContent : "center ", alignItems : "center", mt : "100px"}}>
            <Typography variant="h4">{menu.name}</Typography>
            <Image alt="menu-image" src={menu.assetUrl || "/default-menu.png"} width={200} height={110} style={{position : "absolute" , top : "40px"}} />
            {addonCategories.map(addonCategory => <DisplayAddonCategories addonCategory={addonCategory} key={addonCategory.id} selectedAddonIds={selectedAddonIds} setSelectedAddonIds={setSelectedAddonIds} />)}
            <QuantityOfItems quantity={quantity} setQuantity={setQuantity} />
        </Box>
    )
}

export default menuDetailPage;