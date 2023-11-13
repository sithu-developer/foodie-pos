import { Box } from "@mui/material"
import { useRouter } from "next/router";

const menuDetailPage = () => {
    const router = useRouter()
    const id = router.query.id;
    return (
        <Box>
            {id}
        </Box>
    )
}

export default menuDetailPage;