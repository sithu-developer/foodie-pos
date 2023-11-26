import { Box, Typography  } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Image from "next/image" // here *
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import HomeIcon from '@mui/icons-material/Home';

const OrderAppHeader = () => {
    const router = useRouter();
    const isHome = router.pathname === "/order";
    const isCartPage = router.pathname === "/order/cart";
    const isActiveOrderPage = router.pathname.includes("/order/active-order");
    const cartPageOrActiveOrderPage = isCartPage || isActiveOrderPage;
    const cartItems = useAppSelector(state => state.cart.items);
    const company = useAppSelector(state => state.company.item)

    if(!company) return null;

    return (
        <Box>
            <Box sx={{ height : "100px"}}>
                {!cartPageOrActiveOrderPage ? (
                    <Box sx={{ position : "absolute" , right : "20px" , top : "30px" }}>
                        <AddShoppingCartIcon sx={{  cursor : "pointer" ,  color : "secondary.main" , fontSize : "40px"}} 
                            onClick={() => {
                                const  {tableId} = router.query;
                                router.push({pathname : "/order/cart" , query : {tableId}})
                            }} 
                        />
                        <Typography sx={{position : "absolute" , top : -5 , right : -5}}>{cartItems.length}</Typography>
                    </Box>)
                    : (<Box sx={{ position : "absolute" , right : "20px" , top : "30px" }} >
                        <HomeIcon sx={{fontSize : "40px" , cursor : "pointer"}} onClick={() => {
                            const {tableId } = router.query;
                            router.push({pathname : "/order" , query : {tableId }})
                        }} />
                    </Box>)
                }
                <Image alt="header-image" src="/order-app-header.svg" width={0} height={0} style={{width : "100%" , height : "auto"}} />
            </Box>
            {isHome && (
                <Box sx={{mt : "20px", display : "flex", flexDirection : "column" ,  alignItems : "center"}}>
                    <Typography variant="h3">{company.name}</Typography>
                    <Typography>{company.street}</Typography>
                    <Typography>{company.township}</Typography>
                    <Typography>{company.city}</Typography>
                </Box>
            )}
        </Box>
    )
}

export default OrderAppHeader;