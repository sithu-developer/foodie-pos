import { Box, Typography } from "@mui/material"
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <Box sx={{  mt : "40px"  }}>
            <Box sx={{display : "flex" ,bgcolor : "primary.main", justifyContent : "space-between" , px : "40px" }}>
                <Box sx={{ fontStyle : "italic" , mt : "20px" , color : "white"}}>
                    <Typography>3 * 73 stre</Typography>
                    <Typography>Aung Myae Thar Zan</Typography>
                    <Typography>contact@Foodiepos.com</Typography>
                    <Typography>+95 123 456 78</Typography>
                </Box>
                <Image alt="foodie-pos-logo" src={"/foodiePosLogo.png"} width={180} height={150} />
                <Box sx={{ fontStyle : "italic" , mt : "45px" , display : "flex" , flexDirection : "column" , gap : "20px"}}>
                    <Link href={"/order?tableId=1"} style={{ textDecoration : "none" , color : "white"}} >
                        <Typography>Order app</Typography>
                    </Link>
                    <Link href={"/backoffice"} style={{ textDecoration : "none" , color : "white"}} >
                        <Typography>Backoffice</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;