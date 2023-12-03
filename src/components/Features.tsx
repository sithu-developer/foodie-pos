import { Box, Typography, Zoom } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
    {icon : <MenuBookIcon sx={{fontSize : "70px" , color : "primary.main"}} /> ,
     lable : "Easily manage your menus with Foodie POS",
     delay : "1000ms"},
    {icon : <QrCode2Icon sx={{fontSize : "70px" , color : "primary.main"}} /> , 
     lable : "Scan and order.Quick and easy! Your customer will love it!",
     delay : "1200ms"},
    {icon : <LocationOnIcon sx={{fontSize : "70px" , color : "primary.main"}} /> ,
     lable : "Foodie POS supports multiple locations for your business.",
     delay : "1400ms"},
    {icon : <ChecklistIcon sx={{fontSize : "70px" , color : "primary.main"}} /> ,
     lable : "Backoffice and order apps are included in every subscribtion.",
     delay : "1600ms"},
    {icon : <SupportAgentIcon sx={{fontSize : "70px" , color : "primary.main"}} /> ,
     lable : "Dedicated customer support so that we are always here to help you.",
     delay : "1800ms"},
]

const Features = () => {
    return (
        <Box sx={{ display : "flex" , gap : "100px" , justifyContent : "center" , flexWrap : "wrap" , width : "80vw" , margin : "0 auto" , mt : "30px"}} >
            {features.map(item => <Zoom in style={{ transitionDelay : item.delay}}>
                <Box sx={{ width : "260px" , textAlign : "center" }}>
                    {item.icon}
                    <Typography>{item.lable}</Typography>
                </Box>
            </Zoom>                
            )}
        </Box>
    )
}

export default Features;