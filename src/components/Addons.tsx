import { useAppSelector } from "@/store/hooks";
import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Addon } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
    isRequired : boolean;
    addonCategoryId : number;
    selectedAddons : Addon[];
    setSelectedAddons : Dispatch<SetStateAction<Addon[]>>
}

const Addons = ({isRequired , addonCategoryId , selectedAddons , setSelectedAddons} : Props) => {
    const allAddons = useAppSelector(state => state.addon.items)
    const addons = allAddons.filter(addon => addon.addonCategoryId === addonCategoryId ) 
    //The addons of the above variable are only related to the Current ADDON Category ****
    
    const selectedAddonForEdit = selectedAddons.find(item => item.addonCategoryId === addonCategoryId)
    if(isRequired) {
        return (
            <FormControl>  {/* in this radio , defaultValue is important */}
                <RadioGroup defaultValue={selectedAddonForEdit? selectedAddonForEdit.id : null} onChange={( _ , value) => {
                   const clearedSelectedAddons = selectedAddons.filter(selectedAddon => !addons.includes(selectedAddon));
                   const newSelectedAddon = addons.find(addon => addon.id === Number(value));
                   if(newSelectedAddon) setSelectedAddons([...clearedSelectedAddons , newSelectedAddon ])
                }}>
                {addons.map(addon => <Box key={addon.id} sx={{display : "flex" , justifyContent : "space-between", alignItems : "center" , width : "290px" , mt : "10px"}}>
                    <FormControlLabel key={addon.id} value={addon.id}  control={<Radio />} label={addon.name} />
                    <Typography>{addon.price}</Typography>
                </Box>
                )}
                </RadioGroup>
            </FormControl>
        )
    } else {
        return (
            <FormControl>
                {addons.map(addon =><Box key={addon.id} sx={{display : "flex" , justifyContent : "space-between", alignItems : "center" ,  width : "290px" , mt : "10px"}}>
                    <FormControlLabel key={addon.id} control={<Checkbox defaultChecked={selectedAddons.includes(addon)? true : false} />} value={addon.id} label={addon.name} 
                    onChange={( _ , value) => {
                        if(value === false) {
                            const newSelectedAddons  = selectedAddons.filter(item => item.id !== addon.id);
                            setSelectedAddons(newSelectedAddons);
                        } else {
                            setSelectedAddons([...selectedAddons , addon])
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