import React from 'react';
import movieLogo from '/assets/image.png';

const Footer = () => {
    return (
        <>
         <div className='m-auto w-full border-gray-900 bg-black-800 py-10 border-b'></div>
            <div className='bg-black-800 py-10'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
                        {/* Logo and Description */}
                        <div className="flex flex-col items-start">
                            <img className="w-48 mb-4" src={movieLogo} alt="Logo" />
                            <p className="text-gray-300 text-sm mb-6 transition-transform duration-300 hover:scale-105">
                                Discover your next favorite movie. Join us to explore the latest and greatest in film entertainment.
                            </p>
                            <ul className="flex space-x-4">
                                {/* Social Media Icons */}
                                <li>
                                    <a href="#" title="Twitter" className="text-white transition-colors duration-300 hover:text-blue-400">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Facebook" className="text-white transition-colors duration-300 hover:text-blue-600">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="Instagram" className="text-white transition-colors duration-300 hover:text-pink-500">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
                                            <circle cx="16.806" cy="7.207" r="1.078" />
                                            <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655s-.011 2.683-.054 3.634z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" title="LinkedIn" className="text-white transition-colors duration-300 hover:text-blue-700">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zm-2.703 20.999H15V14.675c0-1.464-.028-3.343-2.038-3.343-2.042 0-2.354 1.595-2.354 3.243v6.424H9.004V9h2.438v1.636h.034c.34-.646 1.164-1.327 2.397-1.327 2.559 0 3.033 1.686 3.033 3.875v6.784zM4.998 9H7v11H4.998V9zm-1.5-6h3v3h-3V3z" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="text-lg text-white mb-4 font-semibold">Quick Links</h5>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 transition-all duration-300 hover:text-white">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 transition-all duration-300 hover:text-white">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 transition-all duration-300 hover:text-white">Movies</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 transition-all duration-300 hover:text-white">Contact</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 transition-all duration-300 hover:text-white">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 transition-all duration-300 hover:text-white">Terms of Service</a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Subscription */}
                        <div>
                            <h5 className="text-lg text-white mb-4 font-semibold">Subscribe to our Newsletter</h5>
                            <form className="flex flex-col">
                                <input type="email" placeholder="Enter your email" className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" required />
                                <button type="submit" className="bg-blue-600 text-white py-2 rounded transition duration-300 hover:bg-blue-700">
                                    Subscribe
                                </button>
                            </form>
                        </div>

                        {/* Company Info */}
                        <div>
                            <h5 className="text-lg text-white mb-4 font-semibold">Company Info</h5>
                            <p className="text-gray-300 mb-4">We are dedicated to providing you the best movies with a focus on reliability, customer service, and uniqueness.</p>
                            <p className="text-gray-300 mb-4">Our team is passionate about movies, and we are here to help you find the perfect one to watch.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-4 text-center bg-black-800 text-gray-300 border-t border-gray-600">
                © 2024 Movie Site. All rights reserved. Made with ❤️ By Aayush
            </div>
        </>
    );
};

export default Footer;


