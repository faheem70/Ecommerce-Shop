import React, { Fragment } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md"
import Navbar from "../layout/Header/Navbar";
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <Fragment>
    <div className="CartItemCard">

      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <MdRemoveShoppingCart className="remove-cart-icon" onClick={() => deleteCartItems(item.product)} />
      </div>
    </div>
    </Fragment>
  );
};

export default CartItemCard;
