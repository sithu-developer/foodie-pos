import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";

const Topbar = () => {
    const {data} = useSession();
    const selectedLocation = useAppSelector(state => state.location.selectedLocation)

    return (
        <Box sx={{bgcolor : "secondary.main",height : "70px",px : "15px", display : "flex", justifyContent : "space-between",alignItems : "center"}}>
            <Box>
                <Image src={"/foodiePosLogo.jpg"} alt="logo"  width={100} height={50}/>
            </Box>
            <Box sx={{ display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                <Typography variant="h4" color={"success.main"}>Foodie POS</Typography>
                <Typography color={"success.main"}>({selectedLocation?.name})</Typography>
            </Box>
           {data ? (<Box>
                <Button variant="contained" onClick={() => signOut({callbackUrl : "/backoffice"})}>Sign out</Button>
            </Box>) : <span /> }
        </Box>
    )
}

export default Topbar;