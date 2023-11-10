import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../assets/foodiePosLogo.jpg"
import { signOut, useSession } from "next-auth/react";

const Topbar = () => {
    const {data } = useSession();
    return (
        <Box sx={{bgcolor : "secondary.main",height : "70px",px : "15px", display : "flex", justifyContent : "space-between",alignItems : "center"}}>
            <Box>
                <Image src={logo} alt="logo"  style={{width : "100px", height : "100%"}}/>
            </Box>
            <Box>
                <Typography variant="h4" color={"success.main"}>Foodie POS</Typography>
            </Box>
           {data ? (<Box>
                <Button variant="contained" onClick={() => signOut({callbackUrl : "/backoffice"})}>Sign out</Button>
            </Box>) : <span /> }
        </Box>
    )
}

export default Topbar;