import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SeriesSuggester = ({ seriesList }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [animateToLeft, setAnimateToLeft] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const image = (series) => {
    const url = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
    return url;
  };

  const handleClick = (suggestedSeries) => {
    const filmType = 'tv';
    navigate(`/tv/${suggestedSeries.id}`, { state: { filmDetails: suggestedSeries, filmType } });
  };

  const handleSuggest = () => {
    const totalSeries = seriesList.length;
    const randomIndex = Math.floor(Math.random() * totalSeries);
    setCurrentIndex(randomIndex);
    setAnimateToLeft(false);

    // Spin the carousel
    if (carouselRef.current) {
      const angle = -360 * (randomIndex + 3); // Added 3 full rotations for more visible spinning
      carouselRef.current.style.transition = 'transform 1.5s ease-out'; // Increased duration for smoother spin
      carouselRef.current.style.transform = `rotate(${angle}deg)`;

      // Start the move-to-left animation shortly before spinning ends
      setTimeout(() => {
        setAnimateToLeft(true); // Start the move-to-left animation
      }, 1300); // Slightly before the spinning ends (e.g., 200ms before)

      // Ensure poster stays in place for 5-6 seconds after animation starts
      setTimeout(() => {
        setAnimateToLeft(false);
      }, 6500); // Duration to show the poster (1.5s spin + 5s stay)
    }
  };

  const suggestedSeries = currentIndex !== null ? seriesList[currentIndex] : null;

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative w-64 h-64 mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute flex items-center justify-center"
                ref={carouselRef}
                style={{ width: '100%', height: '100%' }}
              >
                {seriesList.map((series, index) => (
                  <div
                    key={index}
                    className="absolute flex flex-col items-center"
                    style={{
                      transform: `rotate(${(360 / seriesList.length) * index}deg) translateX(160px)`,
                    }}
                  >
                    <img
                      src={image(series)}
                      alt={series.name}
                      className={`w-24 h-36 object-cover rounded-lg shadow-lg border-2 border-gray-300 ${
                        currentIndex === index ? 'animate-pulse' : ''
                      }`}
                    />
                    <p className="mt-2 text-center text-gray-800">{series.title}</p>
                  </div>
                ))}
                {suggestedSeries && (
                  <div
                    className={`absolute flex flex-col items-center ${animateToLeft ? 'animate-to-left' : ''}`}
                    style={{
                      transform: `rotate(${(360 / seriesList.length) * currentIndex}deg) translateX(160px)`,
                      transition: 'transform 1.5s ease-out',
                      zIndex: 10,
                    }}
                  >
                    <div onClick={() => handleClick(suggestedSeries)} className="relative">
                      <img
                        src={image(suggestedSeries)}
                        alt={suggestedSeries.title}
                        className="cursor-pointer w-32 h-48 object-cover rounded-lg shadow-md border-2 border-gray-300"
                        style={{
                          animation: 'pulse 1.5s infinite',
                        }}
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-transparent to-transparent text-center py-2 text-white text-lg font-bold rounded-b-lg animate-pulse">
                        Watch This
                      </div>
                    </div>
                    <p className="mt-2 text-lg font-medium text-gray-900">{suggestedSeries.title}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleSuggest}
        className="absolute bottom-[-100px] px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        style={{ zIndex: 20 }} // Ensure the button is on top
      >
        Suggest
      </button>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes moveToLeft {
            0% {
              transform: translateX(0) scale(1);
            }
            100% {
              transform: translateX(-25vw) scale(2);
            }
          }
          .animate-to-left {
            animation: moveToLeft 1.5s forwards;
          }
        `}
      </style>
    </div>
  );
};

export default SeriesSuggester;
