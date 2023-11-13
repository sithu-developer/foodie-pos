import { Box, Typography  } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Image from "next/image" // here *
import { useRouter } from "next/router";

const OrderAppHeader = () => {
    const router = useRouter();
    const isHome = router.pathname === "/order";
    
    
    return (
        <Box>
            <Box sx={{ height : "100px"}}>
                <AddShoppingCartIcon sx={{ position : "absolute" , cursor : "pointer" , right : "20px" , top : "30px" , color : "secondary.main" , fontSize : "40px"}} 
                    onClick={() => router.push("/order/cart")} 
                />
                <Image alt="header-image" src="/order-app-header.svg" width={0} height={0} style={{width : "100%" , height : "auto"}} />
            </Box>
            {isHome && (
                <Box sx={{mt : "20px", display : "flex", flexDirection : "column" ,  alignItems : "center"}}>
                    <Typography variant="h3">A Wa Sarr</Typography>
                    <Typography>Hintada Street 39 <br/> SanChaung , Yangon</Typography>
                </Box>
            )}
        </Box>
    )
}

export default OrderAppHeader;