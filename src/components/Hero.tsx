import { Box, Button, Slide, Typography } from "@mui/material";
import Link from "next/link";

const Hero = () => {
    return (
        <Slide direction="down" in timeout={{enter : 1000}} >
        <Box sx={{ display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center" , gap : "20px" }}>
            <Typography variant="h5" sx={{textAlign : "center"}} >Manage your menu catelog easily with Foodie POS and <br/> entice your customers with QR code ordering system.</Typography>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Link href={"/order?tableId=1"} >
                <Button variant="contained">Order App</Button>
                </Link>
                <Link href={"/backoffice"}>
                <Button variant="contained">Backoffice App</Button>
                </Link>
            </Box>
        </Box>
        </Slide>
    )
}

export default Hero;