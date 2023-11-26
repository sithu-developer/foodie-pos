import { Box, Typography } from "@mui/material"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Dispatch, SetStateAction } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
    quantity : number;
    setQuantity : Dispatch<SetStateAction<number>>
}

const QuantityOfItems = ({quantity , setQuantity } : Props) => {

    const handleReduce = () => {
        const newValue = quantity - 1 === 0 ? 1 : quantity -1 ;
        setQuantity(newValue)
    }

    return (
        <Box sx={{ display : "flex" , gap : "10px"}}>
            <RemoveCircleIcon onClick={handleReduce} sx={{cursor : "pointer"}} />
            <Typography >{quantity}</Typography>
            <AddCircleIcon onClick={() => setQuantity(quantity + 1)} sx={{cursor : "pointer"}} />
        </Box>
    )
}

export default QuantityOfItems;