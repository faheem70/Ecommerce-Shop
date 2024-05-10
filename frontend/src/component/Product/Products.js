import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import CountdownTimer from "./CountDownTimer";
import Navbar from "../layout/Header/Navbar";

const categories = [
  "Electronics",
  "Appliances",
  "Toys",
  "Fashion",
  "Furniture",
  "Grocery",
  "SmartPhones",
];

const priceRanges = [
  { min: 0, max: 500 },
  { min: 500, max: 1500 },
  { min: 1500, max: 3000 },
  { min: 3000, max: 5000 },
  { min: 5000, max: 10000 },
  { min: 10000, max: 25000 }
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [instock, setInstock] = useState(false);
  const [outstock, setOutstock] = useState(false);
  const { product, } = useSelector(
    (state) => state.productDetails
  );

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;
  const handleInstockChange = () => {
    setInstock(!instock);
    setOutstock(false);
  }
  const handleOutstockChange = () => {
    setOutstock(!outstock);
    setInstock(false);
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings, instock, outstock));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error, instock, outstock]);





  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title="PRODUCTS -- ARF MART" />
            <div className="container">
              <div className="sidebar">
                <div className="filterBox">
                  <Typography>Price Range</Typography>
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setPrice([range.min, range.max])}
                    >
                      {`${range.min} - ${range.max}`}
                    </button>
                  ))}
                  <Typography>Categories</Typography>
                  <ul className="categoryBox">
                    {categories.map((category) => (
                      <li
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                  <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                    />
                </fieldset>
                  <div>
                    <label>
                      <input type=" checkbox" checked={instock} onChange={handleInstockChange} />Instock
                    </label> <br />
                    <label>
                      <input type="checkbox" checked={outstock} onChange={handleOutstockChange} /> OutOfStock
                    </label>
                  </div>
                </div>
              </div>
              <div className="content">
                <h2 className="productsHeading">Best Deals</h2>
                <CountdownTimer countdownTimestampMs={1735686000000} />
                <div className="products">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                {resultPerPage < count && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>

                )}
              </div>
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
