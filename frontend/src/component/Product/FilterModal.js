// FilterModal.js
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography';
import "./FilterModal.css";

const FilterModal = ({ open, onClose, price, onPriceChange, ratings, onRatingsChange }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="modal-container">
                <div className="modal-content">
                    <Typography variant="h2">Select Filter</Typography>
                    <div className="slider">
                        <Typography>Price Range</Typography>
                        <Slider
                            value={price}
                            onChange={onPriceChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                    </div>
                    <div className="slider">
                        <Typography>Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={onRatingsChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                        />
                    </div>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </Modal>
    );
};

export default FilterModal;
