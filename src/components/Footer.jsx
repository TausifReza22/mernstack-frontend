import React from 'react';
import './Footer.css'; // Assuming you have a separate CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutubeSquare, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



const Footer = () => {
    return (
        <div className="pg-footer">
            <footer className="footer">
                <svg className="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path className="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z" />
                </svg>
                <div className="footer-content">
                    <div className="footer-content-column">
                        <div className="footer-logo">
                            <a className="footer-logo-link" href="#">
                                <span className="hidden-link-text">Heaven</span>
                                <h1>Shop</h1>
                            </a>
                        </div>
                        <div className="footer-menu">
                            <h2 className="footer-menu-name">Get Started</h2>
                            <ul id="menu-get-started" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#">Start</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Documentation</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Installation</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-menu">
                            <h2 className="footer-menu-name">Company</h2>
                            <ul id="menu-company" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#">Contact</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">News</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Careers</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-menu">
                            <h2 className="footer-menu-name">Legal</h2>
                            <ul id="menu-legal" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#">Privacy Notice</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-menu">
                            <h2 className="footer-menu-name">Quick Links</h2>
                            <ul id="menu-quick-links" className="footer-menu-list">
                                <li className="menu-item">
                                    <a href="#" target="_blank" rel="noopener noreferrer">Support Center</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#" target="_blank" rel="noopener noreferrer">Service Status</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Security</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Blog</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Customers</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#">Reviews</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-content-column">
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title">Let's Chat</h2>
                            <p className="footer-call-to-action-description">Have a support question?</p>
                            <a className="footer-call-to-action-button button" href="#">Get in Touch</a>
                        </div>
                        <div className="footer-call-to-action">
                            <h2 className="footer-call-to-action-title">You Call Us</h2>
                            <p className="footer-call-to-action-link-wrapper">
                                <a className="footer-call-to-action-link" href="tel:0124-64XXXX">01-1234567890</a>
                            </p>
                            <p className="footer-call-to-action-link-wrapper">
                                <a className="footer-call-to-action-link" href="tel:0124-64XXXX">Havenly1@gmail.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="footer-social-links">
                    <a href="#" target="_blank" className="footer-social-link">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="#" target="_blank" className="footer-social-link">
                            <FontAwesomeIcon icon={faXmark} />
                        </a>
                        <a href="#" target="_blank" className="footer-social-link">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="#" target="_blank" className="footer-social-link">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                       
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Footer;
