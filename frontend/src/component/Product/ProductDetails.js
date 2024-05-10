import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { BsFillHandbagFill } from "react-icons/bs";
import ReactImageMagnify from 'react-image-magnify';
import Navbar from "../layout/Header/Navbar.js";
const ProductDetails = ({ match }) => {

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  if (!product || !product.description) {
    return null; // or some fallback content if needed
  }
  const descriptionLines = product.description.split('\n');



  const displayedDescription = showFullDescription
    ? descriptionLines
    : descriptionLines.slice(0, 3);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };
  const handleMouseLeave = () => {
    setSelectedImage(null); // Reset selectedImage to null on mouse leave
  };

  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={`${product.name} -- ARF MART`} />
          <div className="ProductDetails">
              <div className="container">

              <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
                <div className="image-grid"

                >
                  {product.images &&
                    product.images.map((item, i) => (
                      <div
                        className="grid-image-container"
                        key={i}
                        onClick={() => handleImageClick(i)}
                      >
                        <img
                          className="grid-image"
                          src={item.url}
                          alt={`Grid Image ${i}`}
                        />
                      </div>
                    ))}
                  {selectedImage !== null && (
                    <div className="magnified-image" onMouseLeave={handleMouseLeave}>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: 'Magnified Image',
                            isFluidWidth: true,
                            src: product.images[selectedImage].url,
                          },
                          largeImage: {
                            src: product.images[selectedImage].url,
                            width: 800,
                            height: 600,
                          },
                          enlargedImagePosition: 'over',
                        }}
                      />
                    </div>
                  )}
                </div>
            </div>


            <div>
              <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                  <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                    ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                    </div>
                  <button
                      disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                      <BsFillHandbagFill style={{ marginRight: '5px' }} />  Add to Cart
                    </button>
                </div>

                <p>
                  Status:
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
                <div class="payment-offers-container single-child">

                  <div class="payment_offers">
                    <div class="offer_text">
                      <span>₹15 off on All UPI Payments</span>
                    </div>
                    <div class="payment_icons">
                      <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/paytm_icon_fa75a315-11a2-4c8e-a241-18af809eb683.svg?v=1682575951" class="single_payment_icon paytm_icon" />
                      <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/gpay_icon_503ebbda-a3e1-4659-af32-0686aecec227.svg?v=1682575951" class="single_payment_icon gpay_icon" />
                      <img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/phone_pe_icon_f9872d32-f8cf-43ca-8fa2-78db125fcdad.svg?v=1682575951" class="single_payment_icon phonepe_icon" />
                    </div>
                  </div>


                </div>

              <div className="detailsBlock-4">
                  <span>Description:</span>
                  {displayedDescription.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  {descriptionLines.length > 3 && !showFullDescription && (
                    <button className="read-more-button" onClick={() => setShowFullDescription(true)}>Read More</button>
                  )}
                  {showFullDescription && (
                    <button className="read-less-button" onClick={() => setShowFullDescription(false)}>Read Less</button>
                  )}
              </div>


              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

            {product.reviews && product.reviews[0] ? (
            <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;