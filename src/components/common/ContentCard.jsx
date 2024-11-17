import React from 'react';
import { Star } from 'lucide-react';

export default function ContentCard({ contentDetails, onClick, shape }) {
  const name = contentDetails.name || contentDetails.title || 'Unknown';
  const imageUrl = shape !== "portrait" 
    ? `https://image.tmdb.org/t/p/w500${contentDetails.poster_path}` 
    : `https://image.tmdb.org/t/p/w500${contentDetails.backdrop_path}`;
  const rating = contentDetails.vote_average ? contentDetails.vote_average.toFixed(1) : null; // Null if no rating
  const filmType = contentDetails.first_air_date ? 'tv' : 'movie';
  const size = shape === "portrait" ? "w-[350px] h-[200px]" : "w-[280px] h-[400px]";

  return (
    <div className="flex flex-col items-left"> {/* Wrapper div */}
      <div 
        onClick={() => onClick(contentDetails, filmType)} 
        className={`cursor-pointer relative ${size} rounded-2xl overflow-hidden group z-10 hover:z-20`}
      >
        {/* Poster Image */}
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Vertical Layout: Details overlaid on the image */}
        {shape !== "portrait" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold mb-2 text-white">{name}</h2>

            {/* Conditionally render rating */}
            {rating && (
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="text-yellow-400 font-semibold">{rating}</span>
              </div>
            )}
          </div>
        )}

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
      </div>

      {/* Non-Vertical Layout: Details outside the image */}
      {shape === "portrait" && (
        <div className="p-3 w-96 text-left"> {/* Details outside the image */}
          <h2 className="text-2xl font-bold text-gray-300 mt-2">{name}</h2>

          {/* Conditionally render rating */}
          {rating && (
            <div className="flex items-center justify-start mt-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="text-gray-700 font-semibold">{rating}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
