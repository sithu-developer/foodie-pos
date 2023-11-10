import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGetAppData } from "@/store/slices/appSlice";
import { Box, Button } from "@mui/material"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const {data : session} = useSession()
  const router = useRouter();
  const init = useAppSelector(store => store.app.init)

   useEffect(() => {
    if(session && !init) {
      dispatch(fetchGetAppData());
    }
  },[session]);
  
  if(!session) {
    return (
      <Box sx={{display : "flex", justifyContent : "center", alignItems : "center",height : "80vh", width : "100vw"}}>
        <Button variant="contained" onClick={() => signIn("google", {callbackUrl : "/backoffice"})}>Sign In</Button>
      </Box>
      )
  } else {
    router.push("/backoffice/orders");
  }
}
