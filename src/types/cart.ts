import { Menu } from "@prisma/client";

export interface CartItem {
    id : string;
    menu : Menu;
    addons : number[];
    quantity : number ;
}

export interface CartSlice {
    items : CartItem[];
    isLoading : boolean;
    error : Error | null;
}