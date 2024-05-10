import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';

const ConfirmationPage = () => {
    const { token } = useParams();
    const [confirmationStatus, setConfirmationStatus] = useState(null);

    useEffect(() => {
        axios
            .get(`https://arf-backend.onrender.com/api/v1/confirm-email/${token}`)
            .then((response) => {
                setConfirmationStatus(response.data.status);
            })
            .catch((error) => {
                // Handle errors
                setConfirmationStatus('error');
            });
    }, [token]);

    return (
        <div style={styles.container}>
            <h1>Your email has been confirmed. You can now log in.</h1>
            <Link to="/login" style={styles.buttonLink}>Login</Link>
        </div>
    );
};

export default ConfirmationPage;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    buttonLink: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
    },
};
