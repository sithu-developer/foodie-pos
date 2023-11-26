import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrder } from "@/store/slices/orderSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { OrderItem } from "@/types/order";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { ORDERSTATUS } from "@prisma/client";

interface Props {
    orderItem : OrderItem;
    isAdmin ?: boolean;
}

const OrderCart = ({orderItem , isAdmin} :Props) => {
    const dispatch = useAppDispatch();
    const addonCategories = useAppSelector(state => state.addonCategory.items);
    const menus = useAppSelector(state => state.menu.items);
    const tables = useAppSelector(state => state.table.items);

    const handleUpdateOrderStatus = (event : SelectChangeEvent<"PENDING" | "COOKING" | "COMPLETE">) => {
       const status = event.target.value as ORDERSTATUS
        dispatch(updateOrder({itemId : orderItem.itemId , status , onSuccess : () => dispatch(setOpenSnackbar({message : "The order status is successfully changed ."})) }))
    }

    const menuName = () => {
        const menu = menus.find(item => item.id === orderItem.menuId);
        if(menu) return menu.name;
    }

    return (
        <Box sx={{width : "300px" , height : "320px" , bgcolor : "info.main" , borderRadius : "7px"}}>
            <Box sx={{ bgcolor : "primary.main" , display : "flex" , alignItems : "center" , justifyContent : "space-between" , borderTopRightRadius : "7px" , borderTopLeftRadius : "7px" , height : "40px" , px :"10px"}}>
                <Typography sx={{ color : "white"}}>{menuName()}</Typography>
                <Typography sx={{ color : "white"}}>Qtn :{orderItem.quantity}</Typography> 
                <Typography sx={{ color : "white"}}>{orderItem.table.name}</Typography>
            </Box>
            <Box sx={{px : "10px"}} >
                <Box sx={{ display : "flex", justifyContent : "space-between" , alignItems : "center", height : "40px" , mb : "5px" ,  borderBottom : "1px solid gray"}}>
                    <Typography>Item Id : </Typography>
                    <Typography>{orderItem.itemId}</Typography>
                </Box>
                <Box sx={{ height : "180px" , overflowY : "scroll" , display : "flex" , flexDirection :"column" , gap : "15px"}}> 
                    {orderItem.orderAddons.length ? orderItem.orderAddons.map(item => {
                        const addonCategory = addonCategories.find(addonCategory => addonCategory.id === item.addonCategoryId)
                        if(addonCategory) {
                            return (
                                <Box key={item.addonCategoryId}>
                                    <Typography>{addonCategory.name}</Typography>
                                    <Box sx={{ ml : "20px"}}>
                                        {item.addons.map(addon => <Typography key={addon.id} sx={{ fontSize : "13px" , fontWeight : "bold ", fontStyle : "italic" }}>{addon.name}</Typography>)}
                                    </Box>
                                </Box>
                            )
                        }
                    })
                    : <Typography sx={{ margin : "0 auto"}}>No Addon</Typography>
                }
                </Box>
                <Box sx={{ display : "flex", justifyContent : "space-between", alignItems : "center" , height : "50px" , mt : "5px",borderTop : "1px solid gray"}}>
                    <Typography>Status : </Typography>
                    {isAdmin? <>
                        <Select
                            sx={{ height : "35px"}}
                            value={orderItem.status}
                            onChange={handleUpdateOrderStatus}
                          >
                            <MenuItem value={ORDERSTATUS.PENDING}>{ORDERSTATUS.PENDING}</MenuItem>
                            <MenuItem value={ORDERSTATUS.COOKING}>{ORDERSTATUS.COOKING}</MenuItem>
                            <MenuItem value={ORDERSTATUS.COMPLETE}>{ORDERSTATUS.COMPLETE}</MenuItem>
                        </Select>
                    </> 
                    : <Typography>{orderItem.status}</Typography>}
                </Box>
            </Box>
        </Box>
    )
}

export default OrderCart;