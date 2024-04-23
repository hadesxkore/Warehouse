import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase authentication
import logo from '../images/logo.png';
import locationIcon from '../images/location.png';
import searchIcon from '../images/search.png';
import userIcon from '../images/userwhite.png';
import sampleImage from '../images/sample.jpg';
import locationTagIcon from '../images/location.png';
import priceTagIcon from '../images/price-tag.png';
import infoIcon from '../images/info.png';
import viewIcon from '../images/view.png';
import chatIcon from '../images/chat.png';
import dashboardIcon from '../images/dashboard.png';
import userProfileIcon from '../images/user.png';
import logoutIcon from '../images/logout1.png';
import { motion, AnimatePresence } from 'framer-motion';

// Import CSS file for animations
import './homepage.css';
function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Effect to check if user is already logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        setShowConfirmation(false); // Close confirmation popup
        auth.signOut()
            .then(() => {
                setIsLoggedIn(false);
                setIsDropdownOpen(false); // Close dropdown after logout
            })
            .catch(error => {
                console.error('Error signing out:', error);
            });
    };

    // Function to toggle dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div style={{ backgroundColor: '#eeeeee' }}>

            <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 md:p-6" style={{ backgroundColor: '#eeeeee' }}>
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <img src={logo} alt="Logo" className="h-20" />
                        <Link to="/" className="text-lg font-semibold hover:text-gray-300 transition duration-300">Home</Link>
                        <Link to="/products" className="text-lg font-semibold hover:text-gray-300 transition duration-300">Products</Link>
                        <Link to="/about" className="text-lg font-semibold hover:text-gray-300 transition duration-300">About Us</Link>
                        <div className="relative">
                            <input type="text" placeholder="Search for a location" className="pl-8 pr-10 py-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 text-white focus:outline-none focus:bg-gray-800" />
                            <img src={locationIcon} alt="Location" className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4" />
                            <img src={searchIcon} alt="Search" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 pt-4" >
                        {!isLoggedIn ? (
                            <>
                                <Link to="/signup" className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg hover:text-gray-300 transition duration-300">Sign Up</Link>
                                <Link to="/login" className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg hover:text-gray-300 transition duration-300">Log In</Link>
                            </>
                        ) : (
                            <div className="relative">
                                <motion.img
                                    src={userIcon}
                                    alt="User"
                                    className="h-10 mb-4 cursor-pointer"
                                    onClick={toggleDropdown}
                                    whileHover={{ scale: 1.1 }}
                                />
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            className={`absolute transform -translate-x-1/2 top-12 w-48 bg-white rounded-lg shadow-lg overflow-hidden dropdown-menu`}
                                            style={{ right: '-200%', zIndex: '999' }}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Link to="/profile" className="block px-4 py-2 flex items-center hover:bg-gray-200 transition duration-300 text-black">
                                                <img src={userProfileIcon} alt="Profile" className="h-6 mr-2 text-black" />
                                                Profile
                                            </Link>
                                            <Link to="/dashboard" className="block px-4 py-2 flex items-center hover:bg-gray-200 transition duration-300 text-black">
                                                <img src={dashboardIcon} alt="Dashboard" className="h-6 mr-2 text-black" />
                                                Dashboard
                                            </Link>
                                            <div className="border-t border-gray-300"></div>
                                            <button className="block w-full text-left px-4 py-2 flex items-center hover:bg-gray-200 transition duration-300 text-black" onClick={() => setShowConfirmation(true)}>
                                                <img src={logoutIcon} alt="Logout" className="h-6 mr-2 text-black" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12" > {/* Add top and bottom margin here */}
                    {/* Cards */}
                    <motion.div
                    className="max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={sampleImage} alt="Product" className="w-full rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={locationTagIcon} alt="Location" className="h-4 mr-2" />
                            <p>Address: Address here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={infoIcon} alt="Description" className="h-4 mr-2" />
                            <p>Description: Description here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={priceTagIcon} alt="Price" className="h-4 mr-2" />
                            <p>Price: Price here</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src={userProfileIcon} alt="Profile" className="h-6 mr-2" />
                            <span>Owner Name</span>
                        </div>
                        <div className="flex justify-between">
                            <Link to="#" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300">
                                <img src={viewIcon} alt="View" className="h-4 mr-2" />
                                View
                            </Link>
                            <Link to="#" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                <img src={chatIcon} alt="Chat" className="h-4 mr-2" />
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
                {/* Cards */}
                <motion.div
                    className="max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <img src={sampleImage} alt="Product" className="w-full rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={locationTagIcon} alt="Location" className="h-4 mr-2" />
                            <p>Address: Address here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={infoIcon} alt="Description" className="h-4 mr-2" />
                            <p>Description: Description here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={priceTagIcon} alt="Price" className="h-4 mr-2" />
                            <p>Price: Price here</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src={userProfileIcon} alt="Profile" className="h-6 mr-2" />
                            <span>Owner Name</span>
                        </div>
                        <div className="flex justify-between">
                            <Link to="#" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300">
                                <img src={viewIcon} alt="View" className="h-4 mr-2" />
                                View
                            </Link>
                            <Link to="#" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                <img src={chatIcon} alt="Chat" className="h-4 mr-2" />
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
                    {/* Cards */}
                    <motion.div
                    className="max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={sampleImage} alt="Product" className="w-full rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={locationTagIcon} alt="Location" className="h-4 mr-2" />
                            <p>Address: Address here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={infoIcon} alt="Description" className="h-4 mr-2" />
                            <p>Description: Description here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={priceTagIcon} alt="Price" className="h-4 mr-2" />
                            <p>Price: Price here</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src={userProfileIcon} alt="Profile" className="h-6 mr-2" />
                            <span>Owner Name</span>
                        </div>
                        <div className="flex justify-between">
                            <Link to="#" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300">
                                <img src={viewIcon} alt="View" className="h-4 mr-2" />
                                View
                            </Link>
                            <Link to="#" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                <img src={chatIcon} alt="Chat" className="h-4 mr-2" />
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
                {/* Cards */}
                <motion.div
                    className="max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <img src={sampleImage} alt="Product" className="w-full rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={locationTagIcon} alt="Location" className="h-4 mr-2" />
                            <p>Address: Address here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={infoIcon} alt="Description" className="h-4 mr-2" />
                            <p>Description: Description here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={priceTagIcon} alt="Price" className="h-4 mr-2" />
                            <p>Price: Price here</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src={userProfileIcon} alt="Profile" className="h-6 mr-2" />
                            <span>Owner Name</span>
                        </div>
                        <div className="flex justify-between">
                            <Link to="#" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300">
                                <img src={viewIcon} alt="View" className="h-4 mr-2" />
                                View
                            </Link>
                            <Link to="#" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                <img src={chatIcon} alt="Chat" className="h-4 mr-2" />
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
                    {/* Cards */}
                    <motion.div
                    className="max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={sampleImage} alt="Product" className="w-full rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={locationTagIcon} alt="Location" className="h-4 mr-2" />
                            <p>Address: Address here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={infoIcon} alt="Description" className="h-4 mr-2" />
                            <p>Description: Description here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={priceTagIcon} alt="Price" className="h-4 mr-2" />
                            <p>Price: Price here</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src={userProfileIcon} alt="Profile" className="h-6 mr-2" />
                            <span>Owner Name</span>
                        </div>
                        <div className="flex justify-between">
                            <Link to="#" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300">
                                <img src={viewIcon} alt="View" className="h-4 mr-2" />
                                View
                            </Link>
                            <Link to="#" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                <img src={chatIcon} alt="Chat" className="h-4 mr-2" />
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
                {/* Cards */}
                <motion.div
                    className="max-w-md p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <img src={sampleImage} alt="Product" className="w-full rounded-lg" />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={locationTagIcon} alt="Location" className="h-4 mr-2" />
                            <p>Address: Address here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={infoIcon} alt="Description" className="h-4 mr-2" />
                            <p>Description: Description here</p>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <img src={priceTagIcon} alt="Price" className="h-4 mr-2" />
                            <p>Price: Price here</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img src={userProfileIcon} alt="Profile" className="h-6 mr-2" />
                            <span>Owner Name</span>
                        </div>
                        <div className="flex justify-between">
                            <Link to="#" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300">
                                <img src={viewIcon} alt="View" className="h-4 mr-2" />
                                View
                            </Link>
                            <Link to="#" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300">
                                <img src={chatIcon} alt="Chat" className="h-4 mr-2" />
                                Contact
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
            {showConfirmation && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg text-center"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-lg font-semibold mb-4">Are you sure you want to log out?</p>
                        <div className="flex justify-center">
                            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-500 transition duration-300">Yes, Logout</button>
                            <button onClick={() => setShowConfirmation(false)} className="bg-gray-400 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">Cancel</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export default HomePage;
