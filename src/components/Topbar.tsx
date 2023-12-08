import { Box, Button, Drawer, Typography } from "@mui/material";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";
import { useState } from "react";


const Topbar = () => {
    const {data} = useSession();
    const selectedLocation = useAppSelector(state => state.location.selectedLocation);
    const [value  , setValue ] = useState<boolean>(false)

    return (
        <Box sx={{bgcolor : "secondary.main",height : "70px",px : "15px", display : "flex", justifyContent : "space-between",alignItems : "center"}}>
            <Box>
                <Image src={"/foodiePosLogo.png"} alt="logo"  width={170} height={150}/>
            </Box>
            <Box sx={{ display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                <Typography variant="h4" color={"success.main"}>Foodie POS</Typography>
                {selectedLocation && <Typography color={"success.main"}>{selectedLocation.name}</Typography>}
            </Box>
           {data ? (<Box>
                <Button sx={{ display : { xs : "none" , sm : "block"}}} variant="contained" onClick={() => signOut({callbackUrl : "/backoffice"})}>Sign out</Button>
            </Box>) : <span /> }
            <Box sx={{ display : { sm : "none"}}}>
                <MenuIcon  sx={{ fontSize : "35px" , color : "success.main"}} onClick={() => setValue(true)}/>
            </Box>
            <Drawer
                anchor={"right"}
                open={value}
                onClose={() => setValue(false)}
            >
                <Sidebar />
            </Drawer>
        </Box>
    )
}

export default Topbar;