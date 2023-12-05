import { Box, Typography } from "@mui/material"
import Image from "next/image";

const comments = [
    {imgSrc : "/Tom.jpg" , name : "Tom" , demotion : "Cat Food Co.Lid" , message : "We increased our sale by 120% during the first 3 month of using Foodie POS.Easy and simple to use. Super duper recommended for everyone who are less tech savy. 5/5" },
    {imgSrc : "/Jerry.jpg" , name : "Jerry" , demotion : "Mouse Food Co.Lid" , message : "Our customers love Foodie POS. Quick and easy with OR code ordering.We now spend more time taking care of our customer instead of taking orders manually. Thanks to Foodie POS!" },
    {imgSrc : "/Dame.jpg" , name : "Dame" , demotion : "Human Food Co.Lid" , message : "Integrated system . Easy to use . Very satisfied. Highly recommended for everyone , Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss" },
]

const Testimonials = () => {
    return (
        <Box sx={{ display : "flex" , justifyContent : "center" , gap : "80px" , mt : "40px"}}>
            {comments.map(item => <Box key={item.name} sx={{bgcolor : "info.main" , width : "350px" , height : "200px" , borderRadius : "10px"}}>
                <Box sx={{ display : "flex" , gap : "20px" , alignItems : "center"}}>
                    <Image alt={item.name} src={item.imgSrc} width={55} height={50}  style={{margin : "5px" , borderRadius : "50px"}} />
                    <Box sx={{ fontStyle : "italic"}}>
                        <Typography variant="body1" >{item.name}</Typography>
                        <Typography variant="body1">{item.demotion}</Typography>
                    </Box>
                </Box>
                <Typography sx={{ padding : "10px"}}>{item.message}</Typography>
            </Box> 
            )}
        </Box>
    )
}

export default Testimonials;