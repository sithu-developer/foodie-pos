import { Box, Typography } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Dispatch, SetStateAction } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

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
            <RemoveCircleOutlineIcon onClick={handleReduce} sx={{cursor : "pointer"}} />
            <Typography >{quantity}</Typography>
            <ControlPointIcon onClick={() => setQuantity(quantity + 1)} sx={{cursor : "pointer"}} />
        </Box>
    )
}

export default QuantityOfItems;