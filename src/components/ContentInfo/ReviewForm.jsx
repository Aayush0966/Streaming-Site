import React, { useState } from 'react';

const ReviewForm = () => {
    const [rating, setRating] = useState(0); // State to store the selected rating

    return (
        <form className="bg-black p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Submit Your Review</h2>

            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:bg-gray-700"
                    required
                />
            </div>

            <div className="mt-4">
                <label className="text-white mb-2 block">Rating (out of 10):</label>
                <div className="flex space-x-2">
                    {[...Array(10)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <label key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={starValue}
                                    className="hidden"
                                    onChange={() => setRating(starValue)} // Update rating on change
                                />
                                <span
                                    className={`cursor-pointer text-2xl transition-colors duration-300 ${
                                        starValue <= rating ? 'text-yellow-500' : 'text-white'
                                    }`}
                                >
                                    ★
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <textarea
                rows="4"
                placeholder="Your Review"
                className="w-full px-4 py-3 mt-4 rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:bg-gray-700"
                required
            ></textarea>

            <button
                type="submit"
                className="mt-4 w-full btn btn-primary  text-white font-bold py-3 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
