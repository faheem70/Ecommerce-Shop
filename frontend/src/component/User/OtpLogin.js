import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';

const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyDUM0Mk8fJO1PG34dKZM3xrJSohrxEFMqg",
    authDomain: "player-24639.firebaseapp.com",
    projectId: "player-24639",
    storageBucket: "player-24639.appspot.com",
    messagingSenderId: "818423344274",
    appId: "1:818423344274:web:a191990d93b9afab2a4a4b"
};

const OtpLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();

        // Append the country code if not present
        const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;

        phoneProvider
            .verifyPhoneNumber(formattedPhoneNumber, recaptchaVerifier.current)
            .then((verificationId) => setVerificationId(verificationId))
            .catch((error) => {
                console.error('Error sending verification code:', error);
            });

        setPhoneNumber('');
    };

    const confirmCode = async () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

        try {
            const userCredential = await firebase.auth().signInWithCredential(credential);
            const user = userCredential.user;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const displayName = user.displayName;
            const email = user.email;

            console.log('User information:', uid);

            // Send user data to the backend
            await axios.post('https://arf-backend.onrender.com/api/v1/otplogin', {
                uid,
                phoneNumber,
                displayName,
                email,
            });

            console.log('User data saved to the backend');
            // Navigate to the desired page
        } catch (error) {
            console.error('Error confirming verification code:', error);
        }
    };

    return (
        <div>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />

            <h2>Login to Verify</h2>

            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button onClick={sendVerification}>Send Verification Code</button>

            <input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button onClick={confirmCode}>Confirm Code</button>
        </div>
    );
};

export default OtpLogin;
