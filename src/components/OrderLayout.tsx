import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import OrderAppHeader from "./OrderAppHeader"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchGetAppData } from "@/store/slices/appSlice"


interface Props {
    children : ReactNode
}

const OrderLayout = ({children} : Props) => {
    const router = useRouter();
    const { tableId } = router.query; 
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.order.items);
    const isActiveOrderPage = router.pathname.includes("/order/active-order");
    const activeOrderButtonShow = !isActiveOrderPage && orders.length > 0;

    useEffect(() => {
        if(tableId) {
            dispatch(fetchGetAppData({ tableId : Number(tableId) }))
        }
    } , [tableId])

    return (
        <Box>
            <OrderAppHeader/>
            <Box>{children}</Box>
            {activeOrderButtonShow && (<Button variant="contained" sx={{ position : "fixed" , bottom : "10px" , right : "10px"}} onClick={() => {
                router.push({pathname : `/order/active-order/${orders[0].orderSeq}` , query : {tableId : router.query.tableId} })
            }}>To Active-Order Page</Button>)}
        </Box>
    )
}

export default OrderLayout