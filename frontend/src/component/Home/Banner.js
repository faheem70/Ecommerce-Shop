import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "../Home/Bann.css";
import { NavLink } from 'react-router-dom';

const data = [
    "https://sparepartsonline.in/wp-content/uploads/2018/08/mobile-phone-accessories-banner.jpg",
    "https://assets-static.invideo.io/images/origin/Creative_Clothing_Advertisement_Ideas_To_Boost_Sales_revised_3_1_cefa9cda88.png",
    "https://img.freepik.com/free-vector/fashion-template-design_23-2150745900.jpg?w=2000",
    "https://i.pinimg.com/originals/ef/80/83/ef8083bfe79088dc00bd8eca9c821cd5.jpg",
    "https://www.boat-lifestyle.com/cdn/shop/files/Wave_Style_Call_WEB_1_1440x.jpg?v=1695129521",


]

const imageLinks = [
    "/category/SmartPhones",
    "/category/Fashion",
    "/category/Fashion",
    "/category/Electronics",
    "/category/Electronics",
];

const Banner = () => {
    const imageStyle = {
        width: '100%',  // Set your desired width here
        height: 'auto', // Automatically calculate the height to maintain aspect ratio
    };
    return (
        <>

            <Carousel
                className="carasousel"
                showThumbs={false}
                autoPlay={true}
                interval={5000}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "transparent",  // Make the background transparent
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "50px",  // Set the height to make the buttons smaller
                    }
                }}>
                {
                    data.map((imag, i) => {
                        return (
                            <NavLink to={imageLinks[i]} key={i}>
                                <img src={imag} alt={`img-${i}`} className="banner_img" />
                            </NavLink>
                        )
                    })
                }

            </Carousel>
        </>
    )
}

export default Banner;
