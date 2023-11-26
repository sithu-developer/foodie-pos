import { OrderAddon, OrderItem } from "@/types/order";
import { Addon, Menu, Order, Table } from "@prisma/client";

export const generateRandomId = () => {  // this function generate random short string id
    return Math.random().toString(36).substring(7);
} 

export const formatOrders = (orders : Order[] , addons: Addon[] , tables : Table[]) => {
    const orderItemIds : string[] = [];
    orders.forEach(order => {
        const itemId = order.itemId;
        const exist = orderItemIds.find(orderItemId => orderItemId === itemId);
        if(!exist) orderItemIds.push(itemId);
    })
    const orderItems : OrderItem[] = orderItemIds.map(orderItemId => {
        const eachItemOrders = orders.filter(order => order.itemId === orderItemId);
        const eachItemAddonIds = eachItemOrders.map(item => item.addonId);
        let orderAddons : OrderAddon[] = []
        eachItemAddonIds.forEach(addonId => {
            if(addonId) {
                const addon = addons.find(addon => addon.id === addonId) as Addon;
                const exist = orderAddons.find(item => item.addonCategoryId === addon.addonCategoryId);
                if(exist) {
                    orderAddons = orderAddons.map(item => item.addonCategoryId === addon.addonCategoryId ?
                        {addonCategoryId : exist.addonCategoryId , addons : [...item.addons , addon].sort((a,b) => a.name.localeCompare(b.name)) } : item)
                } else {
                    orderAddons.push({addonCategoryId : addon.addonCategoryId , addons : [addon]})
                }
            }
            
        })
        orderAddons = orderAddons.sort((a , b) => a.addonCategoryId - b.addonCategoryId)
        /*
        const eachItemAddons = addons.filter(addon => eachItemAddonIds.includes(addon.id));
        const duplicatedAddonCategoryIds = eachItemAddons.map(addon => addon.addonCategoryId);
        const addonCategoryIds : number[] = [];
        duplicatedAddonCategoryIds.forEach(addonCategoryId => {
            const exist = addonCategoryIds.find(item => item === addonCategoryId )
            if(!exist) addonCategoryIds.push(addonCategoryId);
        })
        const orderAddons = addonCategoryIds.map(addonCategoryId => {
            const eachAddons = eachItemAddons.filter(item => item.addonCategoryId === addonCategoryId)
            return {addonCategoryId , addons : eachAddons}
        }) */
        const table = tables.find(item => item.id === eachItemOrders[0].tableId) as Table;
        const orderItem : OrderItem = {
            itemId : orderItemId , status : eachItemOrders[0].status , orderAddons , menuId : eachItemOrders[0].menuId , quantity : eachItemOrders[0].quantity , table 
        };
        return orderItem;
    })
    return orderItems;
}

// to change company name and location names
