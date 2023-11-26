import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { Menu } from "@prisma/client";
import Link from "next/link";

interface Props {
    menu : Menu
    href : string
    isAvailable ?: boolean
}

const MenuCard = ({ menu   , isAvailable , href} : Props) => {
  const {assetUrl , name  , price} = menu
    return (
        <Link href={href} style={{ textDecoration : "none"}} >
        <Card title={isAvailable===false ? "Unavailable" : "" } sx={{  width : "200px", height : "200px" , opacity : isAvailable===false ? 0.5 : 1}}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={assetUrl || "/default-menu.png" }
            alt={name}
            sx={{objectFit : "contain"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
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