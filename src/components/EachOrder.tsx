import { CartItem } from "@/types/cart";
import { Box, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from "@/store/hooks";
import { removeCartItem } from "@/store/slices/cartSlice";
import { useRouter } from "next/router";

interface Props {
    cartItem : CartItem
}

const EachOrder = ( { cartItem } : Props) => {
    const {addons , id , menu, quantity, totalPrice} = cartItem;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleEditCartItem = () => {
        router.push({pathname : `/order/menus/${menu.id}` , query : {...router.query , cartItemId : id } })
    }

    return (
        <Box sx={{ }}>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <Typography variant="h6">{menu.name}</Typography>
                <Typography>Quantity : {quantity}</Typography>
                <Typography>Price : {menu.price}</Typography>
            </Box>
            <Box sx={{ display : "flex" , flexDirection : "column" , gap : "5px"}}>
                {addons.map(addon => <Box key={addon.id} sx={{ display :"flex" , justifyContent : "space-between" , pl : "30px"}}>
                    <Typography>{addon.name}</Typography>
                    <Typography>{addon.price}</Typography>
                </Box>)}
            </Box>
            <Box sx={{ display : "flex" , justifyContent : "flex-end" , gap : "10px"}}>
                <DeleteIcon sx={{cursor : "pointer"}} onClick={() => {
                    dispatch(removeCartItem(cartItem));
                }} />
                <EditIcon sx={{cursor : "pointer"}} onClick={handleEditCartItem} />
            </Box>
        </Box>
    )
}

export default EachOrder;