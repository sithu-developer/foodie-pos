import { Box, Paper, Typography } from "@mui/material"
import Link from "next/link";
import { ReactNode } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Props {
    title : string;
    icon : ReactNode;
    href?: string;
    subtitle? : string;
    isAvailable?: boolean;
    selected?: boolean;
    onClick?: () => void;
}

const ItemCard = ( {href, title , icon , subtitle , isAvailable , selected , onClick } : Props) => {
    if(href) {
        return (
            <Link href={href} style={{textDecoration : "none"}}>
            <Box>
                <Paper elevation={3} sx={{
                        opacity: isAvailable === false ? 0.6 : 1 ,
                        width : "200px",
                        height : "200px",
                        display : "flex",
                        flexDirection : "column",
                        justifyContent : "center",
                        alignItems : "center"}}>
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
            <Paper elevation={3} onClick={() => onClick && onClick()} sx={{position : "relative" ,width : "200px", height : "200px", display : "flex",flexDirection : "column", justifyContent : "center", alignItems : "center" , userSelect : "none" , cursor : "pointer"}}>
                {selected && <Box>
                    <CheckCircleOutlineIcon sx={{ position : "absolute" , top : "5px" , right : "5px" , color : "primary.main"}} />
                </Box>}
                <Box sx={{color : "primary.main"}}>{icon}</Box>
                <Typography variant="h5" sx={{color : "primary.main"  }}>{title}</Typography>
                {subtitle && <Typography variant="h6" sx={{color : "primary.main"}} >{subtitle}</Typography>}
            </Paper>
        </Box>
    )
    }

};

export default ItemCard;