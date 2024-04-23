import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/tailwind.css';
import LoadingPage from './components/LoadingPage';
import SignUpPage from './components/SignUpPage'; 
import LoginPage from './components/LoginPage'; 
import ForgotPasswordPage from './components/ForgotPasswordPage'; 
import VerifyPage from './components/VerifyPage'; 
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoadingPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} /> {/* Add route for ProfilePage */}
            </Routes>
        </Router>
    );
}

export default App;
