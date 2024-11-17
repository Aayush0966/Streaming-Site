import React, { useState } from 'react';
import { Star } from 'lucide-react'; // Make sure to install lucide-react for icons

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-black w-full p-4 sm:p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-black">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-red-500">{review.author}</h3>
      <span className="flex mb-5 items-center">
            <Star className="text-yellow-400 mr-1" size={14} />
            <span>{review.author_details.rating || 'N/A'}/10</span>
          </span>
      <p className={`text-gray-300 text-sm sm:text-base ${isExpanded ? '' : 'line-clamp-4'} mb-4`}>
        {review.content}
      </p>

      {review.content.length > 300 && (
        <button
          onClick={toggleExpand}
          className="text-red-500 hover:text-red-400 transition-colors duration-300 focus:outline-none text-sm sm:text-base"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}

      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-4">
        <div className="flex items-center">
          <span className="mr-1">{new Date(review.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
