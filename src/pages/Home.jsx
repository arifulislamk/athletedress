import { useContext } from "react";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import FeaturesJercy from "../components/FeaturesJercy";
import { AuthContext } from "../provider/AuthProvider";
import Slider from "../components/Slider";

const Home = () => {
    const {user} = useContext(AuthContext) ;
    // console.log(user);
    return (
        <div>
            <Slider />
            <Banner />
            <FeaturesJercy />
            
            <ContactUs />
        </div>
    );
};

export default Home;