import React from 'react';

function GenreCard({ genre, backdropPath, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`relative w-56 h-24 flex-shrink-0 overflow-hidden rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
        isSelected ? 'border-2 border-green-600' : ''
      }`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="justify-center items-center w-full font-roboto font-semibold text-center text-white bg-black-700/60  py-10">
        {genre.name}
      </h2>
    </div>
  );
}


export default GenreCard;
