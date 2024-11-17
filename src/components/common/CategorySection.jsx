import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from './ContentCard';

export default function CategorySection({ contentDetails, type, shape }) {
  const navigate = useNavigate();


  const handleClick = (contentDetails) => {
    const filmType = contentDetails.first_air_date ? 'tv' : 'movie';
    navigate(`/${filmType}/${contentDetails.id}`);
  };

  return (
    <section className="relative w-full px-4  mx-auto rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-afacad text-white">{type}</h2>
      </div>

      <div className={`flex ${shape === "portrait"? '' : 'gap-6'} overflow-auto scrollbar-hide `}>
        {contentDetails.slice(0, 12).map((content, index) => (
          <div key={index} className="relative group rounded-lg">
            {/* Ensure contentDetails is passed correctly */}
            <ContentCard contentDetails={content} shape={shape} onClick={handleClick} />
          </div>
        ))}
      </div>
    </section>
  );
}
