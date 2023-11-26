import OrderCart from "@/components/OrderCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshOrderBackoffice } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utils/generals";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.order.items);
    const tables = useAppSelector(state => state.table.items);
    const addons = useAppSelector(state => state.addon.items);
    const [orderItems , setOrderItems ] = useState<OrderItem[]>([]);

    useEffect(() => {
        if(orders) {
            const locationId = Number(localStorage.getItem("selectedLocationId"));
            const currentLocationTablesIds = tables.filter(item => item.locationId === locationId).map(table => table.id);
            const currentLocationOrders = orders.filter(order => currentLocationTablesIds.includes(order.tableId));
            const orderItems = formatOrders(currentLocationOrders , addons , tables );
            setOrderItems(orderItems);
        }
    } , [orders]);

    useEffect(() => {
        const intervalId = setInterval(handleRereshOrderBackoffice , 5000)
        return () => {
            clearInterval(intervalId);
        }
    } , [])

    const handleRereshOrderBackoffice = () => {
        const locationId = Number(localStorage.getItem("selectedLocationId"));
        dispatch(refreshOrderBackoffice({ locationId }))
    }
    
    if(!orderItems.length) return null;

    return (
        <Box sx={{ p : "30px" , display : "flex" , flexWrap : "wrap" , gap : "20px"}}>
            {orderItems.map(orderItem => <OrderCart key={orderItem.itemId} orderItem={orderItem} isAdmin />)}
        </Box>
    )
}

export default OrdersPage;