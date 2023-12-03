import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Box } from "@mui/material";

const HomePage = () => {
    return (
        <Box>
            <Header/>
            <Hero/>
            <Features/>
            <Testimonials/>
            <Footer/>
        </Box>
    )
}

export default HomePage;