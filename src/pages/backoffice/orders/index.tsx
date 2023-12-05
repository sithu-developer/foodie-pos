import OrderCart from "@/components/OrderCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshOrderBackoffice } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import { formatOrders } from "@/utils/generals";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useEffect, useState } from "react";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.order.items);
    const tables = useAppSelector(state => state.table.items);
    const addons = useAppSelector(state => state.addon.items);
    const [orderItems , setOrderItems ] = useState<OrderItem[]>([]);
    const [ selectedState , setSelectedState ] = useState<ORDERSTATUS>(ORDERSTATUS.PENDING);
    const [filteredOrderItems , setFilteredOrderItems] = useState<OrderItem[]>([]);

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
        const filteredOrderItems = orderItems.filter(item => item.status === selectedState);
        setFilteredOrderItems(filteredOrderItems)
    } , [ selectedState , orderItems ])

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
    

    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "center" }}>
                <ToggleButtonGroup
                  value={selectedState}
                  exclusive
                  onChange={(event , value) => setSelectedState(value)}
                  aria-label="text alignment"
                >
                  <ToggleButton value={ORDERSTATUS.PENDING} aria-label="left aligned">{ORDERSTATUS.PENDING}</ToggleButton>
                  <ToggleButton value={ORDERSTATUS.COOKING} aria-label="centered">{ORDERSTATUS.COOKING}</ToggleButton>
                  <ToggleButton value={ORDERSTATUS.COMPLETE} aria-label="right aligned">{ORDERSTATUS.COMPLETE}</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ p : "30px" , display : "flex" , flexWrap : "wrap" , justifyContent : { xs : "center" , sm : "flex-start"} , gap : "20px"}}>
                {filteredOrderItems.map(orderItem => <OrderCart key={orderItem.itemId} orderItem={orderItem} isAdmin />)}
            </Box>
        </Box>
    )
}

export default OrdersPage;