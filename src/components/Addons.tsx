import { useAppSelector } from "@/store/hooks";
import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
    isRequired : boolean;
    addonCategoryId : number;
    selectedAddonIds : number[];
    setSelectedAddonIds : Dispatch<SetStateAction<number[]>>
}

const Addons = ({isRequired , addonCategoryId , selectedAddonIds , setSelectedAddonIds} : Props) => {
    const allAddons = useAppSelector(state => state.addon.items)
    const addons = allAddons.filter(addon => addon.addonCategoryId === addonCategoryId ) 
    const addonIds = addons.map(item => item.id); //The ids of addons in this variable are only related to the Current ADDON Category ****

    if(isRequired) {
        return (
            <FormControl>
                <RadioGroup onChange={( _ , value) => {
                   const clearedSelectedAddonIds = selectedAddonIds.filter(selectedAddonId => !addonIds.includes(selectedAddonId));
                   setSelectedAddonIds([...clearedSelectedAddonIds , Number(value) ])
                }}>
                {addons.map(addon => <Box key={addon.id} sx={{display : "flex" , justifyContent : "space-between", width : "290px" , mt : "10px"}}>
                    <FormControlLabel key={addon.id} value={addon.id} control={<Radio />} label={addon.name} />
                    <Typography>{addon.price}</Typography>
                </Box>
                )}
                </RadioGroup>
            </FormControl>
        )
    } else {
        return (
            <FormControl>
                {addons.map(addon =><Box key={addon.id} sx={{display : "flex" , justifyContent : "space-between", width : "290px" , mt : "10px"}}>
                    <FormControlLabel key={addon.id} control={<Checkbox defaultChecked={false} />} value={addon.id} label={addon.name} 
                    onChange={( _ , value) => {
                        if(value === false) {
                            const newSelectedAddonIds  = selectedAddonIds.filter(addonId => addonId !== addon.id);
                            setSelectedAddonIds(newSelectedAddonIds);
                        } else {
                            setSelectedAddonIds([...selectedAddonIds , addon.id])
                        }
                    }} />
                    <Typography>{addon.price}</Typography>
                </Box>   
                )}
            </FormControl>
        )
    }

}

export default Addons;