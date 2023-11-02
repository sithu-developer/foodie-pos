import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createAddonCategory } from "@/store/slices/addonCategorySlice"
import { setOpenSnackbar } from "@/store/slices/snackbarSlice"
import { NewAddonCategoryOptions } from "@/types/addonCategory"
import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const defaultAddonCategory : NewAddonCategoryOptions = {name : "" , isRequired : false, selectedMenuIds : []};

const NewAddonCategory = ({open , setOpen } : Props) => {
    const menus = useAppSelector(state => state.menu.items);
    const [ newAddonCategory , setNewAddonCategory] = useState<NewAddonCategoryOptions>(defaultAddonCategory);
    const dispatch = useAppDispatch()

    const onSuccess = () => {
        setOpen(false);
        setNewAddonCategory(defaultAddonCategory);
        dispatch(setOpenSnackbar({message : "New addonCategory is created"}))
    }

    const handleCreateAddonCategory = () => {
        const isValid = newAddonCategory.name && newAddonCategory.selectedMenuIds.length > 0;
        if(!isValid) dispatch(setOpenSnackbar({message : "Error ! , please complete the above first . " , severity : "error"}))
        dispatch(createAddonCategory({...newAddonCategory, onSuccess}));
    }


    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewAddonCategory(defaultAddonCategory);
            }} >
            <DialogTitle>Addon Category</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px" , width : "300px"}}>
                <TextField placeholder="name" onChange={(event) => setNewAddonCategory({...newAddonCategory, name : event.target.value})} />
                <FormControl>
                    <InputLabel>menu</InputLabel>
                    <Select
                        label="menu"
                        multiple
                        value={newAddonCategory.selectedMenuIds}
                        onChange={(event) => setNewAddonCategory({...newAddonCategory , selectedMenuIds : event.target.value as number[]})}
                        renderValue={(selectedMenuIds) => {
                            return <Box sx={{display : "flex", gap : "4px" , flexWrap : "wrap"}}>
                                {selectedMenuIds.map(selectedMenuId => {
                                    const menu = menus.find(menu => menu.id === selectedMenuId);
                                    if(menu) return <Chip key={menu.id} label={menu.name}  />
                                })}
                            </Box>
                        }}
                        MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 48 * 4.5 + 8,
                                width: 250,
                              },
                            },
                          }}
                    >   
                        {menus.map(item => <MenuItem key={item.id} value={item.id} >
                            <Checkbox checked={newAddonCategory.selectedMenuIds.includes(item.id)} />
                            <ListItemText primary={item.name} />
                        </MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Box>
                    <FormControlLabel control={<Checkbox  />} label="is required" onChange={( _ , value) => setNewAddonCategory({...newAddonCategory, isRequired : value})} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ display : "flex" , justifyContent : "flex-end" , gap : "20px"}}>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewAddonCategory(defaultAddonCategory);
                }} >Cancel</Button>
                <Button variant="contained" disabled={!(newAddonCategory.name && newAddonCategory.selectedMenuIds.length)} onClick={handleCreateAddonCategory} >Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewAddonCategory;