import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Tabs, Tab } from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderPage = () => {
    const router = useRouter();
    const {companyId , tableId} = router.query;
    const menuCategories = useAppSelector(state => state.menuCategory.items)
    const [value , setValue ] = useState(0);
    const menuCategoryMenus = useAppSelector(state => state.menuCategoryMenu.items)
    const menus = useAppSelector(state => state.menu.items)
    const [selectedMenuCategory , setSelectedMenuCategory] = useState<MenuCategory>()

    useEffect(() => {
        setSelectedMenuCategory(menuCategories[0])
    } , [menuCategories])

    const renderMenus = () => {
      const menuIds = menuCategoryMenus.filter(item => item.menuCategoryId === selectedMenuCategory?.id).map(item => item.menuId)
      const selectedMenus = menus.filter(menu => menuIds.includes(menu.id))
      return selectedMenus.map(menu => <MenuCard key={menu.id} menu={menu} href={`/order/menus/${menu.id}?companyId=${companyId}&tableId=${tableId}`} />)
    /* return selectedMenus.map(menu => {
        const href = { pathname : `/order/menus/${menu.id}` }
       return  <MenuCard key={menu.id} menu={menu} href={href} />
      } ) */
    }

    return (
       <Box sx={{ width: '100%', mt : "20px" , ml : "20px" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={(evt , value) => setValue(value)} aria-label="basic tabs example">
            {menuCategories.map(item => <Tab key={item.id} label={item.name} onClick={() => setSelectedMenuCategory(item)} />)}
          </Tabs>
        </Box>
        <Box sx={{ display : "flex" , gap : "20px" , flexWrap : "wrap" , mt : "20px" , p : "20px"}}>{renderMenus()}</Box>
      </Box>
    )
}

export default OrderPage;