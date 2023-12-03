import OrderCart from "@/components/OrderCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshOrder } from "@/store/slices/orderSlice";
import { formatOrders } from "@/utils/generals";
import { Box, Chip } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActiveOrder = () => {
    const router = useRouter();
    const orderSeq   = String(router.query.id);
    const orders = useAppSelector(state => state.order.items);
    const addons = useAppSelector(state => state.addon.items);
    const tables = useAppSelector(state => state.table.items)
    const orderItems = formatOrders(orders , addons , tables );
    const dispatch = useAppDispatch();
    let intervalId : NodeJS.Timeout;

    useEffect(() => {
        if(orderSeq!== "undefined") {
            intervalId = setInterval(handleRreshOrders , 3000);
        }
        return () => {
            clearInterval(intervalId);
        }
    } , [orderSeq]);

    const handleRreshOrders = () => {
        dispatch(refreshOrder({ orderSeq }))
    };

    return (
        <Box sx={{ display: "flex" , flexDirection : "column" , mt : "30px"}}>
            <Chip label={`OrderSeq : ${orderSeq}`} sx={{ fontSize : { xs : "18px" , sm : "25px"} , bgcolor : "success.main" , py : "30px" , margin : "0 auto" }} />
            <Box sx={{ p : "30px" , display : "flex" , flexWrap : "wrap" , justifyContent : { xs : "center" , sm : "flex-start"} , gap : "20px"}}>
                {orderItems.map(orderItem => <OrderCart key={orderItem.itemId} orderItem={orderItem}/>)  }
            </Box>
        </Box>
    )
}

export default ActiveOrder;