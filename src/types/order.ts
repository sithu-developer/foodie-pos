import { Addon, ORDERSTATUS, Order, Table } from "@prisma/client";
import { BaseOptions } from "./app";
import { CartItem } from "./cart";

export interface OrderSliceInitialState {
    items : Order[]
    isLoading : boolean
    error : Error | null
}

export interface CreateOrderOptions extends BaseOptions {
    tableId : number;
    cartItems : CartItem[];
    totalPrice : number ; // this totalPrice is added becaues of my project's structure
}

export interface UpdateOrderOptions extends BaseOptions {
    itemId : string;
    status : ORDERSTATUS;
}

export interface RefreshOrderOptions extends BaseOptions {
    orderSeq : string;
}

export interface RefreshOrderBackofficeOptions extends BaseOptions {
    locationId : number;
}


export interface OrderAddon {
    addonCategoryId : number;
    addons : Addon[];
}

export interface OrderItem {
    itemId : string;
    status : ORDERSTATUS;
    menuId : number;
    quantity: number;
    table : Table;
    orderAddons : OrderAddon[];
}