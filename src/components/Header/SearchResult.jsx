import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentCard from '../common/ContentCard';

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { keyword, data } = location.state || { keyword: '', data: [] };
  const contentList = data.results || []; // Ensure contentList is always an array
  const scrollContainerRef = useRef(null); // Create a ref for the scrollable container

  const handleClick = (contentDetails, type) => {
    navigate(`/${type}/${contentDetails.id}`);
  };

  useEffect(() => {
    // Reset scroll position to the left when the keyword changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [keyword]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-black-800 via-black-800 to-black-700 px-12">
      <section className="relative w-full px-4 mx-auto rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-afacad text-white">Search Result for {keyword}</h2>
        </div>

        <div 
          className={`flex overflow-auto gap-7 scrollbar-hide`} 
          ref={scrollContainerRef} // Attach the ref here
        >
          {contentList.map((content, index) => (
            <div key={index} className="relative group rounded-lg">
              <ContentCard contentDetails={content} onClick={handleClick} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResult;
