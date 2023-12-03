import { Box, Slide, Typography } from "@mui/material";
import Image from "next/image"

const Header = () => {
    return (
        <Box sx={{ position : "fix"}}>
            <Image alt="header-image" src={"header.svg"} width={0} height={0} style={{ width : "100%" , height : "auto" }} />
            <Typography variant="h3" sx={{ position : "absolute" , top : "40px" , left : "40px" , color : "info.main"}} >Foodie POS</Typography>
            <Box sx={{ position : "absolute" , top : "20px" , right : "40px"}}>
                <Slide direction="left" in timeout={{enter : 1000}}>
                    <Image alt="cooking-logo" src="/pandaLogo.png" height={350} width={350}/>  
                </Slide>
            </Box>
        </Box>
    )
}

export default Header;