import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoryProducts, clearErrors } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import './CategoryProduct.css'; // Import the CSS file
import Loader from '../layout/Loader/Loader';
import Navbar from '../layout/Header/Navbar';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import FilterModal from './FilterModal';
import TuneIcon from '@material-ui/icons/Tune';

function CategoryProducts() {
    const { products, loading, error } = useSelector((state) => state.categoryProducts);
    const dispatch = useDispatch();
    const { category } = useParams();
    const alert = useAlert();

    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch category products when the component mounts
        dispatch(fetchCategoryProducts(category)); // Pass the category you want to fetch
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch, category]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePriceChange = (event, newPrice) => {
        setPrice(newPrice);
    };

    const handleRatingsChange = (event, newRating) => {
        setRatings(newRating);
    };

    return (
        <Fragment>
            <Navbar />
            {loading ? (
                <Loader />
            ) : (
                    <div className="typography">
                        <Typography variant="h5" >{category}</Typography>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span className="open-filter-button" onClick={handleOpenModal}>
                                Apply Filter <TuneIcon style={{ verticalAlign: "middle", marginBottom: "3px" }} />
                            </span>
                        </div>

                        <FilterModal
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            price={price}
                            onPriceChange={handlePriceChange}
                            ratings={ratings}
                            onRatingsChange={handleRatingsChange}
                        />

                        <div className="product-container">
                            {products && products.length > 0 ? (
                                products
                                    .filter(product => product.price >= price[0] && product.price <= price[1])
                                    .filter(product => product.ratings >= ratings)
                                    .map((product) => (
                                        <div key={product._id} className="product-card">
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                    <Typography variant="body1">No products found.</Typography>
                            )}
                        </div>
                    </div>
            )}
        </Fragment>
    );
}

export default CategoryProducts;
