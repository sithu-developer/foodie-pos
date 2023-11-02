import { Box } from "@mui/material";
import { ReactNode } from "react"
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";

interface Props {
    children : ReactNode;
}
const Layout = ({children} : Props) => {
    const {data : session} = useSession();
    
    return (
        <Box>
            <Topbar />
            <Box sx={{display : "flex"}}>
                {session && <Sidebar />}
                <Box sx={{width : "100%", height : "100%", padding : "20px"}}>{children}</Box>
            </Box>
        </Box>
    )
}

export default Layout;