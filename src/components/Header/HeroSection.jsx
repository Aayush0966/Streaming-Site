import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ contents, type }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();
  const [content, setContent] = useState(contents[0]); // Set the initial content
  const [num, setNum] = useState(1); // Start from the second content for looping
  // Generate play URL based on type
  const playUrl =
    type === 'movie'
      ? `/watch/${type}/${content.id}`
      : `/watch/${type}/${content.id}/1/1`;

  useEffect(() => {
    // Set the initial background image based on content's backdrop_path
    if (content?.backdrop_path) {
      setBackgroundImage(`https://image.tmdb.org/t/p/original${content.backdrop_path}`);
    }

    // Loop to update the content every 3 seconds
    const showLoop = () => {
      setContent(contents[num]); // Update content
      setNum((prevNum) => (prevNum + 1) % contents.length); // Increment `num` and loop when end is reached
    };

    const interval = setInterval(showLoop, 200000); // Set interval to update content every 3 seconds

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [contents, num]); // Only run this effect when `contents` or `num` changes

  const handlePlay = () => {
    navigate(playUrl);
  };

  const handleLearnMore = () => {
    navigate(`/${type}/${content.id}`);
  };

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black-800 via-black-800/80 to-transparent"></div>

      {/* Hero Content */}
      <div className="z-10 text-gray-100 px-4 md:px-8 max-w-4xl absolute bottom-16 left-12 animate-slide-in-bottom-left">
        <h1 className="text-5xl sm:text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down tracking-tight text-left">
          {content?.title || content?.original_title || content?.original_name || 'No name'}
        </h1>
        <p className="text-lg sm:text-md md:text-lg mb-7 max-w-2xl text-left w-xl h-20 overflow-hidden text-gray-300 animate-fade-in-up">
          {content?.overview || 'A thrilling experience awaits you.'}
        </p>

        <div className="flex flex-col sm:flex-row justify-start items-center gap-4 animate-fade-in">
          <button
            onClick={handlePlay}
            className="group bg-red-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
          >
            <Play size={20} className="mr-2" />
            <span>Watch Now</span>
          </button>
          <button
            onClick={handleLearnMore}
            className="group bg-gray-800/50 backdrop-blur-lg text-white py-3 px-6 rounded-md shadow-lg hover:bg-gray-700/50 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
          >
            <Info size={20} className="mr-2" />
            <span>Learn More</span>
          </button>
        </div>
      </div>
      
    </section>
  );
}
