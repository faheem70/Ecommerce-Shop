import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step, withStyles } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Navbar from "../layout/Header/Navbar";

const styles = (theme) => ({
  stepStyles: {
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      marginTop: "100px", // Adjust margin for mobile devices
    },
    marginTop: "70px", // Default margin
  },
});

const CheckoutSteps = ({ activeStep, classes }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <Fragment>
      <Navbar />
      <Stepper alternativeLabel activeStep={activeStep} className={classes.stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default withStyles(styles)(CheckoutSteps);
