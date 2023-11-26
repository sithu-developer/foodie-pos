import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import Addons from "./Addons";
import { Dispatch, SetStateAction } from "react";

interface Props {
    addonCategory : AddonCategory;
    selectedAddons : Addon[];
    setSelectedAddons : Dispatch<SetStateAction<Addon[]>>
}

const DisplayAddonCategories = ({addonCategory , selectedAddons , setSelectedAddons } : Props) => {
    const {id, isRequired , name} = addonCategory;
    return (
        <Box>
            <Box sx={{display : "flex" , justifyContent : "space-between", alignItems : "center" ,  width : "300px"}}>
                <Typography>{name}</Typography>
                <Chip label={isRequired ? "Required" : "Optional"} sx={{bgcolor : "success.main"}} />
            </Box>
            <Addons isRequired={isRequired} addonCategoryId={id}  selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons} />
        </Box>
    )
}

export default DisplayAddonCategories;