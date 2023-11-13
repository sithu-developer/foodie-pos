import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BackofficeLayout from "./BackofficeLayout";
import OrderLayout from "./OrderLayout";

interface Props {
    children : ReactNode
}
const Layout = ({children} : Props) => {
    const router = useRouter()
    const isOrderApp = router.pathname === "/order" ;
    const isBackoffice = router.pathname.includes("/backoffice")
    
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