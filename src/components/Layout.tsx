import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import BackofficeLayout from "./BackofficeLayout";
import OrderLayout from "./OrderLayout";

interface Props {
    children : ReactNode
}
const Layout = ({children} : Props) => {
    const { isReady ,...router} = useRouter()
    const {tableId} = router.query;
    const isOrderApp =  tableId ;
    const isBackoffice = router.pathname.includes("/backoffice");

    useEffect(() => {
        if(isReady && !tableId && !isBackoffice) {  
           // console.log("in" , companyId , tableId , "isReady" , isReady); // isReady testing
           router.push("/")
        }
    } , [isReady])
    
    if(isOrderApp) {
        return (
            <Box>
                <OrderLayout>{children}</OrderLayout>
            </Box>
        )
    }

    if(isBackoffice) {
        return (
            <Box>
                <BackofficeLayout>{children}</BackofficeLayout>
            </Box>
        )
    }

    return <Box>{children}</Box>
}

export default Layout;