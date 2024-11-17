import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchContentByGenre, formatRuntime } from '../../Utils/Utils.js'; // Adjust the path as needed
import { Play, Info, Clock, Star } from 'lucide-react';
import GenreCard from './GenreCard.jsx';
import { useNavigate } from 'react-router-dom';

export default function ExploreByGenre({ type, contentList }) {
  const [genres, setGenres] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreContentMap, setGenreContentMap] = useState({});
  const navigate = useNavigate();
  
  const playUrl = type === "movie" ?
    `/watch/${type}/${content[0]?.id}` :
    `/watch/${type}/${content[0]?.id}/1/1`;

  // Fetch genres on mount
  useEffect(() => {
    const getGenres = async () => {
      const genreList = await fetchGenres(type);
      setGenres(genreList.genres);

      // Automatically set the first genre and fetch its movies
      if (genreList.genres.length > 0) {
        const firstGenreId = genreList.genres[0].id;
        setSelectedGenre(firstGenreId);
      }

      const genreMap = {};
      for (const genre of genreList.genres) {
        const popularContents = await fetchContentByGenre(type, genre.id, 'vote_count.desc');
        if (popularContents.length > 0) {
          genreMap[genre.id] = popularContents[0];
        }
      }
      setGenreContentMap(genreMap);
    };

    getGenres();
  }, []);

  // Fetch content based on selected genre
  useEffect(() => {
    const getContent = async () => {
      if (selectedGenre) {
        const initialContent = await fetchContentByGenre(type, selectedGenre, 'vote_count.desc');
        setContent(initialContent);
      }
    };

    getContent();
  }, [selectedGenre]);

  // Function to handle genre click and fetch all movies
  const handleGenreClick = async (genreId, genreName) => {
    setSelectedGenre(genreId);
    contentList(genreId, genreName)
  };

  const handlePlay = () => {
    navigate(playUrl);
  };

  const handleLearnMore = () => {
    navigate(`/${type}/${content[0]?.id}`);
  };

  const getGenreNames = (content) => {
    if (!content || content.length === 0) return [];
    const genreIds = content[0]?.genre_ids || [];
    const genreNames = genres.filter(genre => genreIds.includes(genre.id)).map(genre => genre.name);
    
    return genreNames.flatMap((name, index) => [
      <span key={name + index} className="flex items-center">
        {name}
      </span>,
      index < genreNames.length - 1 && (
        <span key={`dot-${index}`} className="w-1 h-1 mx-2 bg-white rounded-full inline-block"></span>
      )
    ]);
  };

  const backgroundImage = `https://image.tmdb.org/t/p/original${content[0]?.backdrop_path}`;
  const rating = content[0]?.vote_average ? content[0]?.vote_average.toFixed(1) : 'N/A';

  return (
<section
  className="relative h-auto w-full overflow-hidden"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-black-800 via-black-800/20 to-black-800"></div>

  <div className="relative z-10 w-full h-full flex flex-col items-start px-6 md:px-12">
    <h1 className="text-white mt-32 text-xl md:text-2xl font-extrabold bg-black/40 px-2 py-1 rounded-lg shadow-lg">
      Explore by Genre
    </h1>

    <div className="z-10 text-gray-100 max-w-4xl mt-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 animate-fade-in-down tracking-tight text-left">
        {content[0]?.title || content[0]?.original_title || content[0]?.original_name || 'No Title Available'}
      </h1>
      <div className="flex flex-wrap items-center space-x-6 text-lg">
        {content[0]?.runtime && (
          <span className="flex items-center space-x-2">
            <Clock className="mr-1" size={20} />
            <span>{formatRuntime(content[0]?.runtime)}</span>
          </span>
        )}
        <span className="flex items-center">
          <Star className="text-yellow-400 mr-1" size={20} />
          {rating}
          <span className="mx-2">|</span>
          {getGenreNames(content)}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row w-full justify-start items-center gap-6 mt-8">
        <button
          onClick={handlePlay}
          className="group bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
        >
          <Play size={20} className="mr-2" />
          <span>Watch Now</span>
        </button>
        <button
          onClick={handleLearnMore}
          className="group bg-gray-800/60 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
        >
          <Info size={20} className="mr-2" />
          <span>Learn More</span>
        </button>
      </div>
    </div>

    <div className="relative my-24 z-10 w-full">
      <div className="overflow-x-auto scrollbar-hide flex space-x-4">
        {genres.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            backdropPath={genreContentMap[genre.id]?.backdrop_path}
            onClick={() => handleGenreClick(genre.id, genre.name)} // Handle genre click
            isSelected={selectedGenre === genre.id}
          />
        ))}
      </div>
    </div>
  </div>
</section>
  );
}
