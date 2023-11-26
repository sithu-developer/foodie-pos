import DisplayAddonCategories from "@/components/DisplayAddonCategories";
import QuantityOfItems from "@/components/QuantityOfItems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem, replaceCartItem } from "@/store/slices/cartSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { Box, Button, Typography } from "@mui/material"
import { Addon } from "@prisma/client";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const menuDetailPage = () => {
    const [quantity , setQuantity ] = useState<number>(1);
    const [selectedAddons , setSelectedAddons ] = useState<Addon[]>([])
    const dispatch = useAppDispatch();
    const router = useRouter()
    const menuId = Number(router.query.id);
    const allMenus = useAppSelector(state => state.menu.items);
    const menu = allMenus.find(menu => menu.id === menuId);

    const allMenuAddonCategories = useAppSelector(state => state.menuAddonCategory.items);
    const addonCategoryIds = allMenuAddonCategories.filter(item => item.menuId === menuId).map(item => item.addonCategoryId);
    const addonCategories = useAppSelector(state => state.addonCategory.items).filter(item => addonCategoryIds.includes(item.id));
    
    const requiredAddonCategories = addonCategories.filter(addonCategory => addonCategory.isRequired === true)
    const selectedAddonCategoryIds = selectedAddons.map(addon => addon.addonCategoryId);
    const requriedSelectedAddonCategories = addonCategories.filter(addonCategory => selectedAddonCategoryIds.includes(addonCategory.id)).filter(item => item.isRequired === true);

    
    const {cartItemId} = router.query;
    const cartItems = useAppSelector(state => state.cart.items);

    useEffect(() => {
        if(cartItemId) {
            const cartItemToEdit = cartItems.find(cartItem => cartItem.id === cartItemId);
            if(cartItemToEdit ) {
                setSelectedAddons(cartItemToEdit.addons);
                setQuantity(cartItemToEdit.quantity)
            } 
        }
    } , [cartItemId , cartItems])

    
    if(!menu || (cartItemId && !selectedAddons.length)) return null;
    
    // let totalPriceOfAddons = 0;
    // selectedAddons.forEach(item => totalPriceOfAddons += item.price)
    const totalPriceOfAddons = selectedAddons.reduce((initial , selectedAddon) => initial += selectedAddon.price , 0)
    const totalPrice = (menu.price + totalPriceOfAddons) * quantity;

    const handleAddToCart = () => {
        const id = nanoid(7);
        dispatch(addCartItem({ id , menu , addons : selectedAddons , quantity , totalPrice }))
        dispatch(setOpenSnackbar({message : "This item is successfully added to cart"}));
        const {id : menuid ,...query} = router.query
        router.push({pathname : "/order" , query  });
    }

    const handleUpdateCartItem = () => {
        dispatch(replaceCartItem({id : String(cartItemId) , menu  , addons : selectedAddons ,quantity , totalPrice }));
        dispatch(setOpenSnackbar({message : "This item is successfully updated"}));
        const {id : menuid , cartItemId : clearId ,...query} = router.query
        router.push({pathname : "/order/cart" , query  });
    }

    return (
        <Box sx={{ display : "flex" ,gap : "20px", flexDirection : "column", justifyContent : "center ", alignItems : "center", mt : "80px" , pb : "40px" }}>
            <Typography variant="h4">{menu.name}</Typography>
            <Image alt="menu-image" src={menu.assetUrl || "/default-menu.png"} width={200} height={110} style={{position : "absolute" , top : "40px"}} />
            {addonCategories.map(addonCategory => <DisplayAddonCategories addonCategory={addonCategory} key={addonCategory.id} selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons} />)}
            <QuantityOfItems quantity={quantity} setQuantity={setQuantity} />
            <Typography sx={{ fontWeight : "bold" , fontSize : "20px"}}>Total Price : {totalPrice}</Typography>
            {cartItemId ? <Button variant="contained" onClick={handleUpdateCartItem} >Update Item</Button>
            : <Button variant="contained" disabled={requiredAddonCategories.length === requriedSelectedAddonCategories.length ? false : true} onClick={handleAddToCart} >Add to cart</Button>
            }
        </Box>
    )
}

export default menuDetailPage;