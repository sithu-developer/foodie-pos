import { Box, Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Items } from "@/types/sidebar";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import TableBarIcon from '@mui/icons-material/TableBar';
import SettingsIcon from '@mui/icons-material/Settings';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";


const Sidebar = () => {

    return (
        <Box sx={{width : "200px",borderTopRightRadius : "10px", bgcolor : "secondary.main",height : "90vh" , display : "flex", flexDirection : "column"}}>
            {items.slice(0,7).map(item => {
                return (
                  <Link href={item.href} style={{textDecoration : "none", color : "white"}} key={item.id}>
                  <ListItemButton>
                    <ListItemIcon  sx={{color : "white"}}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                  </ListItemButton>
                  </Link>
                )
            })}
            <Divider variant="middle" sx={{bgcolor : "white"}}/>
            {items.slice(-1).map(item => {
                return (
                  <Link href={item.href} style={{textDecoration : "none", color : "white"}} key={item.id}>
                  <ListItemButton>
                    <ListItemIcon  sx={{color : "white"}}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                  </ListItemButton>
                  </Link>
                )
            })}
        </Box>
    )
}
export default Sidebar;

const items : Items[] = [
    {
        id : 1,
        name : "Orders",
        icon : <ShoppingBasketIcon />,
        href : "/backoffice/orders"
    },
    {
        id : 2,
        name : "Menu Categories",
        icon : <CategoryIcon />,
        href : "/backoffice/menu-categories"
    },
    {
        id : 3,
        name : "Menus",
        icon : <RestaurantMenuIcon />,
        href : "/backoffice/menus"
    },
    {
        id : 4,
        name : "Addon Catagories",
        icon : <ClassIcon />,
        href : "/backoffice/addon-categories"
    },
    {
        id : 5,
        name : "Addon",
        icon : <WaterDropIcon />,
        href : "/backoffice/addons"
    },
    {
        id : 6,
        name : "Tables",
        icon : <TableBarIcon />,
        href : "/backoffice/tables"
    },
    {
        id : 7,
        name : "Locations",
        icon : <LocationOnIcon />,
        href : "/backoffice/locations"
    },
    {
        id : 8,
        name : "Setting",
        icon : <SettingsIcon />,
        href : "/backoffice/settings"
    },
]