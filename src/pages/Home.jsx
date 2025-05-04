import { useContext } from "react";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import FeaturesJercy from "../components/FeaturesJercy";
import { AuthContext } from "../provider/AuthProvider";

const Home = () => {
    const {user} = useContext(AuthContext) ;
    console.log(user);
    return (
        <div>
            <Banner />
            <ContactUs />
            <FeaturesJercy />
        </div>
    );
};

export default Home;