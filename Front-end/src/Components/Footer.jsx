import React from 'react';
function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>
                        We are dedicated to providing quality language education
                        to learners worldwide. Join us on our mission to make
                        language learning accessible and enjoyable for everyone!
                    </p>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: support@languagelearning.com</p>
                    <p>Phone: +(250) 567-890-67</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Language Learning System. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
