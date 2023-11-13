import { Box, Chip, Typography } from "@mui/material";
import { AddonCategory } from "@prisma/client";
import Addons from "./Addons";
import { Dispatch, SetStateAction } from "react";

interface Props {
    addonCategory : AddonCategory;
    selectedAddonIds : number[];
    setSelectedAddonIds : Dispatch<SetStateAction<number[]>>
}

const DisplayAddonCategories = ({addonCategory , selectedAddonIds , setSelectedAddonIds } : Props) => {
    const {id, isRequired , name} = addonCategory;
    return (
        <Box>
            <Box sx={{display : "flex" , justifyContent : "space-between", width : "300px"}}>
                <Typography>{name}</Typography>
                <Chip label={isRequired ? "Required" : "Optional"} sx={{bgcolor : "success.main"}} />
            </Box>
            <Addons isRequired={isRequired} addonCategoryId={id}  selectedAddonIds={selectedAddonIds} setSelectedAddonIds={setSelectedAddonIds} />
        </Box>
    )
}

export default DisplayAddonCategories;