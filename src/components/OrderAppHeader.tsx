import { Box  } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Image from "next/image" // here *

const OrderAppHeader = () => {
    
    return (
        <Box sx={{ height : "100px"}}>
            <AddShoppingCartIcon sx={{ position : "absolute" , cursor : "pointer" , right : "20px" , top : "30px" , color : "secondary.main" , fontSize : "40px"}}/>
            <img src="/order-app-header.svg" />
        </Box>
    )
}

export default OrderAppHeader;