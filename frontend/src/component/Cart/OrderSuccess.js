import React, { Fragment } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Navbar from "../layout/Header/Navbar";

const OrderSuccess = () => {
  return (
    <Fragment>
      <Navbar />
    <div className="orderSuccess">

      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
    </Fragment>
  );
};

export default OrderSuccess;
