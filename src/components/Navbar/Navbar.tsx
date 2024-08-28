import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '/images/QiewcodeLogo.png';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isLogoMenuOpen) {
            setIsLogoMenuOpen(false);
            setIsOpen(false);
        }
    };

    const toggleLogoMenu = () => {
        setIsLogoMenuOpen(!isLogoMenuOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <nav className="relative bg-gradient-to-br from-[rgb(4,48,47)] via-[rgba(8,57,54,1)] to-[rgba(4,48,47,1)] shadow">
            <div className="container px-0 lg:px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                    <div className="">
                        <a href="#" onClick={toggleLogoMenu}>
                            <img src={LogoImage} alt="Simplicio Logo" className="h-28 cursor-pointer" />
                        </a>
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button onClick={toggleMenu} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            {!isOpen && !isLogoMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-[rgb(4,48,47)] md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                    <div className="flex flex-col md:flex-row md:mx-6">
                        <a className="my-2 text-gray-200 transition-colors duration-300 transform hover:text-[#1c857e] md:mx-4 md:my-0" href="#">Accuiel</a>
                        <a className="my-2 text-gray-200 transition-colors duration-300 transform hover:text-[#1c857e] md:mx-4 md:my-0" href="#about">A Propos de nous</a>
                        <a className="my-2 text-gray-200 transition-colors duration-300 transform hover:text-[#1c857e] md:mx-4 md:my-0" href="#contact">Contactez-nous</a>
                    </div>
                </div>

                <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 lg:hidden transition-all duration-300 ease-in-out bg-[rgb(4,48,47)] md:bg-transparent md:relative md:w-auto ${isLogoMenuOpen ? 'translate-x-0 opacity-100' : 'opacity-0 md:opacity-100 -translate-x-full md:translate-x-0'}`}>
                    <div className="flex flex-col md:flex-row md:mx-6">
                        <Link className="my-2 text-gray-200 transition-colors duration-300 transform hover:text-[#1c857e] md:mx-4 md:my-0" to="/">Qiewcode <br />
                            <span className='px-4'>Oui sommes nous?</span></Link>
                        <Link className="my-2 text-gray-200 transition-colors duration-300 transform hover:text-[#1c857e] md:mx-4 md:my-0" to="/#contact">Nous contacter</Link>
                    </div>
                </div>

                {/* Profile/Login Button */}
                <div className="md:ml-4 relative">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button onClick={toggleProfileMenu} className="flex items-center text-gray-200 focus:outline-none">
                                <FaUserCircle className="text-4xl mr-2" />
                                <span className="text-lg">Profile</span>
                            </button>
                            {/* Dropdown for profile */}
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 py-2 w-56 bg-white  z-30 rounded-lg shadow-xl">
                                    <Link to="/message" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">message</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                                    <button onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="text-gray-200 bg-[#1c857e] px-6 py-3 rounded-lg hover:bg-[#166e64] transition duration-300">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
