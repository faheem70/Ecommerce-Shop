import React, { useState } from "react";
import logo from "../../../images/logo3.png";
import { MdAccountCircle, MdAddShoppingCart, MdSearch, MdMenu, MdClose } from "react-icons/md";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"
import UserOptions from "./UserOptions";
const Navbar = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const history = useHistory();
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    };
    return (
        <nav className={`custom-navbar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <div className="custom-logo">
                <a href="/">
                    <img src={logo} alt="Logo" className="custom-logo-img" />
                </a>
            </div>
            <div className={`custom-menu-toggle`} onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
            </div>
            <ul className={`custom-nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
                <li className="custom-nav-item">
                    <NavLink exact to="/" activeClassName="active-link">
                        <AiOutlineHome />
                    </NavLink>
                </li>
                <li className="custom-nav-item">
                    <NavLink to="/products" activeClassName="active-link">
                        Best Deals
                    </NavLink>
                </li>

            </ul>


            <div className="custom-search-bar">
                <form onSubmit={searchSubmitHandler} className="search-form" style={{ width: "100%" }}>
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Search a Product ..."
                            onChange={(e) => setKeyword(e.target.value)}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <button type="submit">
                        <MdSearch className="custom-search-icon" />

                    </button>
                </form>

            </div>


            <div className={`custom-icons ${isMobileMenuOpen ? "mobile-open" : ""}`}>
                {user && user.avatar && user.avatar.url ? (
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url}
                        alt="Profile"
                    />

                ) : (
                    <a href="/login" className="custom-nav-item">
                        <MdAccountCircle />

                    </a>
                )}
                <a href="/cart" className="custom-nav-item">
                    <MdAddShoppingCart />
                    {cartItems && cartItems.length > 0 && (
                        <span className="cart-counter">{cartItems.length}</span>
                    )}

                </a>
            </div>
        </nav>
    );
};

export default Navbar;
