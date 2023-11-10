import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { createNewMenu } from "@/store/slices/menuSlice"
import { setOpenSnackbar } from "@/store/slices/snackbarSlice"
import { Box, Button, Checkbox, Chip, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { MenuCategory } from "@prisma/client"
import { useEffect, useState } from "react"
import FileDropZone from "./FileDropZone"
import { CreateNewMenuOption } from "@/types/menu"
import { config } from "@/utils/config"

interface Props {
    open : boolean
    setOpen : (value : boolean) => void
}

const defaultMenu = {name : "", price : 0 , selectedMenuCategoryIds : []};

const NewMenu = ({open , setOpen } : Props) => {
    const dispatch = useAppDispatch();
    const menuCategories = useAppSelector(state => state.menuCategory.items);
    const [newMenu , setNewMenu ] = useState<CreateNewMenuOption>(defaultMenu);
    const [menuImage , setMenuImage ] = useState<File>()

    const handleOnChange = (event : SelectChangeEvent<number[]>) => {
        const selectedMenuCategoryIds = event.target.value as number[];
        setNewMenu({ ...newMenu, selectedMenuCategoryIds});
    }

    const onSuccess = () => {
        setOpen(false);
        setNewMenu(defaultMenu);
        dispatch(setOpenSnackbar({message : "New menu is created successfully"}))
    }

    const handleCreateMenu = async() => {
        const newMenuPayload = {...newMenu}
        console.log("menuImage : ",menuImage)
        if(menuImage) {
            const formData = new FormData();  //****
            formData.append("files" , menuImage)
            const response =await fetch(`${config.apiBaseUrl}/assets`, {
                method : "POST",
                body : formData,
            });
            const { assetUrl } = await response.json();
            newMenuPayload.assetUrl = assetUrl;
            console.log("in " , assetUrl)
            dispatch(createNewMenu({...newMenuPayload  , onSuccess }))
        } else {
            dispatch(createNewMenu({...newMenuPayload  , onSuccess }))
        }
    };

    const onFileSelected = async(acceptedFiles : File[]) => {
        console.log(acceptedFiles[0])
        setMenuImage(acceptedFiles[0]);
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewMenu(defaultMenu);
        }}>
            <DialogTitle>Menu</DialogTitle>
            <DialogContent sx={{display : "flex",flexDirection : "column", gap : "20px" , minWidth : "400px"}}>
                <TextField placeholder="name" onChange={(event) => setNewMenu({...newMenu , name : event.target.value})} />
                <TextField placeholder="price" onChange={(event) => setNewMenu({...newMenu , price : Number(event.target.value)})} />
                <FormControl>
                    <InputLabel>Menu Categories</InputLabel>
                    <Select 
                    value={newMenu.selectedMenuCategoryIds}
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
                            <Checkbox checked={newMenu.selectedMenuCategoryIds.includes(item.id)} />
                            <ListItemText primary={item.name} />
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <Box>
                    <FileDropZone onFileSelected={onFileSelected}/>
                    {menuImage && (
                        <Chip sx={{mt : "10px"}} label={menuImage.name} onDelete={() => setMenuImage(undefined)} />
                    )}
                </Box>
                <Box sx={{display : "flex", justifyContent : "flex-end", gap: "20px"}}>
                    <Button variant="contained" onClick={() => {
                        setOpen(false);
                        setNewMenu(defaultMenu);
                    }}>Cancel</Button>
                    <Button variant="contained" disabled={!(newMenu.name && newMenu.selectedMenuCategoryIds.length)} onClick={() => handleCreateMenu()} >Comfirm</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default NewMenu;