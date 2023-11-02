import { Box, Paper, Typography } from "@mui/material"
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    title : string;
    icon : ReactNode;
    href?: string;
    subtitle? : string;
}

const ItemCard = ( {href, title , icon , subtitle} : Props) => {
    if(href) {
        return (
            <Link href={href} style={{textDecoration : "none"}}>
            <Box>
                <Paper elevation={3} sx={{width : "200px", height : "200px", display : "flex",flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
                    <Box sx={{color : "primary.main"}}>{icon}</Box>
                    <Typography variant="h5" sx={{color : "primary.main"}}>{title}</Typography>
                    {subtitle && <Typography variant="h6" sx={{color : "primary.main"}} >{subtitle}</Typography>}
                </Paper>
            </Box>
            </Link>
        )
    } else {
    return (
        <Box> 
            <Paper elevation={3} sx={{width : "200px", height : "200px", display : "flex",flexDirection : "column", justifyContent : "center", alignItems : "center"}}>
                <Box sx={{color : "primary.main"}}>{icon}</Box>
                <Typography variant="h5" sx={{color : "primary.main"}}>{title}</Typography>
                {subtitle && <Typography variant="h6" sx={{color : "primary.main"}} >{subtitle}</Typography>}
            </Paper>
        </Box>
    )
    }

};

export default ItemCard;