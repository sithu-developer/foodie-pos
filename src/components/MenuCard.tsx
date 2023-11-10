import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import Link from "next/link";

interface Props {
    href : string;
    title : string;
    price : number;
    assetUrl : string;
}

const MenuCard = ({href , price , title , assetUrl} : Props) => {
    return (
        <Link href={href} style={{ textDecoration : "none"}} >
        <Card sx={{ width : "200px", height : "200px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={assetUrl}
            alt={title}
            sx={{objectFit : "contain"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2">
                $ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
    )
}

export default MenuCard;