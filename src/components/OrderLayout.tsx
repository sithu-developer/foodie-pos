import { Box } from "@mui/material"
import { ReactNode } from "react"

interface Props {
    children : ReactNode
}

const OrderLayout = ({children} : Props) => {
    return (
        <Box>
            <Box>This is order layout</Box>
            <Box>{children}</Box>
        </Box>
    )
}

export default OrderLayout