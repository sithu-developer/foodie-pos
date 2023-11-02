import { MenuCategoryMenu } from "@prisma/client";

export interface InitialState {
    items : MenuCategoryMenu[];
    isLoading : boolean;
    error : Error | null;
}