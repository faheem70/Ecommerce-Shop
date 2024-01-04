import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategoryProducts } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Home/ProductCard';
import './CategoryProducts.css'; // Import the CSS file
import Loader from '../layout/Loader/Loader';
import Navbar from '../layout/Header/Navbar';

function CategoryProducts() {
    const { products, loading, error } = useSelector((state) => state.categoryProducts);
    const dispatch = useDispatch();
    const { category } = useParams();

    useEffect(() => {
        // Fetch category products when the component mounts
        dispatch(fetchCategoryProducts(category)); // Pass the category you want to fetch
    }, [dispatch, category]);

    return (
        <Fragment>
            <Navbar />
            {loading ? (
                <Loader />
            ) : (
                    <div>
                        <h1>{category}</h1>

                        <div className="product-container">

                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product._id} className="product-card">

                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <p>No products found.</p>
                            )}
            </div>
                    </div>
            )}
        </Fragment>
    );
}

export default CategoryProducts;
