import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header>
                <nav className={`navbar navbar-expand-lg navbar-custom ${isOpen ? 'open' : ''}`}>
                    <div className="container">

                        <a className="navbar-brand" href="#">
                            <h1 className="logo-text">Language Learning System</h1>
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={toggleNavbar}
                            aria-controls="navbarNav"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`} id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/'><a className="nav-link" href="#signin">Home</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login'><a className="nav-link" href="#signin">Sign In</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/signup'><a className="nav-link" href="#signup">Sign Up</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/about'> <a className="nav-link" href="#aboutus">About Us</a></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
