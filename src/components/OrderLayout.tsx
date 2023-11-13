import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import OrderAppHeader from "./OrderAppHeader"
import { useAppDispatch } from "@/store/hooks"
import { fetchGetAppData } from "@/store/slices/appSlice"


interface Props {
    children : ReactNode
}

const OrderLayout = ({children} : Props) => {
    const router = useRouter();
    const {companyId , tableId} = router.query;
    const dispatch = useAppDispatch()
    

    useEffect(() => {
        if(companyId) {
            dispatch(fetchGetAppData({companyId : Number(companyId) , tableId : Number(tableId) }))
        }
    } , [companyId])

    return (
        <Box>
            <OrderAppHeader/>
            <Box>{children}</Box>
        </Box>
    )
}

export default OrderLayout