import EachOrder from "@/components/EachOrder";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emptyCart } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { Box, Button, Divider, Typography } from "@mui/material"
import { Order } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CartPage = () => {
    const cartItems = useAppSelector(state => state.cart.items);
    const router = useRouter()
    const tableId = Number(router.query.tableId);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if(!cartItems.length) {
    //         router.push({pathname : "/order" , query : router.query})
    //     }
    // } , [cartItems]);

    const totalPriceOfAllCartItems = cartItems.reduce((initial , eachCartItem) =>initial += eachCartItem.totalPrice , 0)

    const comfirmOrder = () => {
        const isValid = tableId;
        if(!isValid) return alert("Required Table Id.")
        dispatch(createOrder({tableId , cartItems , totalPrice : totalPriceOfAllCartItems  , onSuccess : (orders : Order[]) => {
            router.push({pathname :  `/order/active-order/${orders[0].orderSeq}` , query : { tableId }  });
            dispatch(emptyCart())
        }}));
    }

    return (
        <Box sx={{ display : "flex" , justifyContent : "center" , alignItems : "center"  , pb : "40px" }}>
            {!cartItems.length ? <Typography variant="h5" sx={{ mt : "40px"}}>Your cart is empty .</Typography> 
            : <Box sx={{ width : "600px" , minHeight : "280px" , bgcolor : "success.main" , mt : "40px" , p : "30px" , borderRadius : "20px" , display : "flex" , flexDirection : "column " , gap : "20px"}}>
                <Typography variant="h5" sx={{ fontWeight : "bold" , margin : "0 auto"}}>Review of Your Order</Typography>
                {cartItems.map(item => <EachOrder cartItem={item} key={item.id} />)} 
                <Divider variant="middle"   />
                <Box sx={{display : "flex" , justifyContent : "flex-end"}}>
                    <Typography variant="h5">Total : {totalPriceOfAllCartItems}</Typography>
                </Box>
                <Box sx={{display : "flex" , justifyContent : "center"}}>
                    <Button variant="contained" onClick={comfirmOrder} >Comfirm Order</Button>
                </Box>
            </Box>}
        </Box>
    )
}

export default CartPage;