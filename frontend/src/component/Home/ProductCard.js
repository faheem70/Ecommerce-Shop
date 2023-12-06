import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../actions/cartAction";
import { BsFillHandbagFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const addToCartHandler = (event) => {
    event.preventDefault(); // Prevent the default navigation behavior
    dispatch(addItemsToCart(product._id, 1)); // Assuming product._id is the correct identifier

  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0]?.url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
      <button onClick={(event) => addToCartHandler(event)}
        style={{
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer', // Add this to indicate that it's clickable
        }}
      >
        <BsFillHandbagFill style={{ marginRight: '5px' }} /> Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
