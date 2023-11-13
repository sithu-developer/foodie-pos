import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Topbar = () => {
    const {data } = useSession();
    return (
        <Box sx={{bgcolor : "secondary.main",height : "70px",px : "15px", display : "flex", justifyContent : "space-between",alignItems : "center"}}>
            <Box>
                <Image src={"/foodiePosLogo.jpg"} alt="logo"  width={100} height={50}/>
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