import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCompany } from "@/store/slices/companySlice";
import { setSelectedLocation } from "@/store/slices/locationSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateCompanyOptions } from "@/types/company";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const company = useAppSelector(state => state.company.item);
    const [updatedCompany , setUpdatedCompany ] = useState<UpdateCompanyOptions>()

    useEffect(() => {
      if(company) {
        setUpdatedCompany({id : company.id , name : company.name , street : company.street , township : company.township , city : company.city})
      }
    } , [company]);

    if(!company || !updatedCompany) return null;

    const handleUpdateCompany = () => {
      dispatch(updateCompany({...updatedCompany , onSuccess : () => {
        dispatch(setOpenSnackbar({message : "Company is successfully updated ."}))
      }} ))
    }

    return (
      <Box sx={{display : "flex" , flexDirection : "column" , gap : "20px"}}>
        <Typography variant="h5" color="primary.main" >Setting</Typography>
        <TextField defaultValue={company.name} onChange={(event) => setUpdatedCompany({...updatedCompany , name : event.target.value })} label="Name" />
        <TextField defaultValue={company.street} onChange={(event) => setUpdatedCompany({...updatedCompany , street : event.target.value })} label="Street" />
        <TextField defaultValue={company.township} onChange={(event) => setUpdatedCompany({...updatedCompany , township : event.target.value })} label="Township" />
        <TextField defaultValue={company.city} onChange={(event) => setUpdatedCompany({...updatedCompany , city : event.target.value })} label="City" />
        <Box>
          <Button variant="contained" disabled={!updatedCompany.name || !updatedCompany.street || !updatedCompany.township || !updatedCompany.city} onClick={() => handleUpdateCompany()} >Update</Button>
        </Box>
      </Box>
    )
}

export default SettingsPage;