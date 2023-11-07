import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createNewMenu } from "@/store/slices/menuSlice"
import { setOpenSnackbar } from "@/store/slices/snackbarSlice"
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { MenuCategory } from "@prisma/client"
import { useEffect, useState } from "react"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const defaultMenu = {name : "", price : 0};

const NewMenu = ({open , setOpen } : Props) => {
    const dispatch = useAppDispatch();
    const menuCategories = useAppSelector(state => state.menuCategory.items);
    const [newMenu , setNewMenu ] = useState(defaultMenu)
    const [selectedMenuCategoryIds , setSelectedMenuCategoryIds ] = useState<number[]>([]);

    const handleOnChange = (event : SelectChangeEvent<number[]>) => {
        const selectedIds = event.target.value as number[];
        setSelectedMenuCategoryIds(selectedIds);
    }

    const onSuccess = () => {
        setOpen(false);
        setSelectedMenuCategoryIds([]);
        setNewMenu(defaultMenu);
        dispatch(setOpenSnackbar({message : "New menu is created successfully"}))
    }

    const handleCreateMenu = () => {
        dispatch(createNewMenu({...newMenu , selectedMenuCategoryIds , onSuccess }))
    };

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setSelectedMenuCategoryIds([]);
            setNewMenu(defaultMenu);
        }}>
            <DialogTitle>Menu</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px" , minWidth : "400px"}}>
                <TextField placeholder="name" onChange={(event) => setNewMenu({...newMenu , name : event.target.value})} />
                <TextField placeholder="price" onChange={(event) => setNewMenu({...newMenu , price : Number(event.target.value)})} />
                <FormControl>
                    <InputLabel>Menu Categories</InputLabel>
                    <Select 
                    value={selectedMenuCategoryIds}
                    label="Menu Categories" onChange={handleOnChange}
                    multiple
                    MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                          },
                        },
                    }}
                    renderValue={(selectedMenuCategoryIds) => {
                        const selectedNames = selectedMenuCategoryIds.map(selectedMenuCategoryId => {
                            const menuCategory = menuCategories.find(item => item.id === selectedMenuCategoryId) as MenuCategory;
                            return menuCategory.name;
                        });
                        return selectedNames.join(" , ")
                    }}
                    >
                        {menuCategories.map(item => <MenuItem key={item.id} value={item.id}>
                            <Checkbox checked={selectedMenuCategoryIds.includes(item.id)} />
                            <ListItemText primary={item.name} />
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <Box sx={{display : "flex", justifyContent : "flex-end", gap: "20px"}}>
                    <Button variant="contained" onClick={() => {
                        setOpen(false);
                        setSelectedMenuCategoryIds([]);
                        setNewMenu(defaultMenu);
                    }}>Cancel</Button>
                    <Button variant="contained" disabled={!(newMenu.name && selectedMenuCategoryIds.length)} onClick={() => handleCreateMenu()} >Comfirm</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewMenu;