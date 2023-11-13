import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react"
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetAppData } from "@/store/slices/appSlice";

interface Props {
    children : ReactNode;
}
const Layout = ({children} : Props) => {
    const {data : session} = useSession();
    const init = useAppSelector(state => state.app.init)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(session && !init) {
            dispatch(fetchGetAppData({}))
        }
    } , [session])

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