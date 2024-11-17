import React, { useEffect, useState } from 'react';
import CategorySection from '../common/CategorySection';
import { useLoaderData } from 'react-router-dom';
import HeroSection from '../Header/HeroSection';
import ExploreByGenre from './ExploreByGenre';
import { fetchContentByGenre } from '../../Utils/Utils';

function Movies() {
  const {voteCountMovies, highestGrossingMovies, upcomingMovies, } = useLoaderData();
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genreName, setGenreName] = useState([]);
  useEffect( () => {
    window.scrollTo(0, 0);
    showMoviesByGenre(28, 'Action')
  }, [])

  const showMoviesByGenre =async (genreId, genreName) => {
    setGenreName(genreName);
    const movies = await fetchContentByGenre('movie', genreId, 'vote_count.desc');
    setMoviesByGenre(movies);
    // getMovies();
  }


  return (
    <>
    <div className="min-h-screen bg-neutral-950 text-gray-100">

    <HeroSection  type="movie" contents={voteCountMovies.results} />
    <div className="px-4 md:px-8 lg:px-12 bg-black-800 space-y-8">
        <CategorySection contentDetails={voteCountMovies.results} type="Discover Movies" />
        <CategorySection contentDetails={highestGrossingMovies.results} type="Highest Grossing Movies" />
        
        {/* New wrapper for ExploreByGenre */}
        <div className="-mx-12">
        <ExploreByGenre contentList={(genreId, genreName) => showMoviesByGenre(genreId, genreName)} type='movie' />
        </div>
        <CategorySection contentDetails={moviesByGenre} type={`${genreName} Movies`} />

        <CategorySection shape="portrait" contentDetails={upcomingMovies.results} type="Upcoming Movies" />
    </div>
 
       </div>

    </>
  );
}

export default Movies;

export const discoverMovies = async () => {
  const api1 = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1&include_adult=true&sort_by=vote_count.desc`;
  const api2 = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1&include_adult=true&sort_by=revenue.desc`;
  const upcomingMoviesApi = `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&language=en-US&page=1`;
  const getGenresApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&language=en`;

  const [voteCountMovies, highestGrossingMovies, upcomingMovies, genresList] = await Promise.all([
    fetch(api1).then(response => response.json()),
    fetch(api2).then(response => response.json()),
    fetch(upcomingMoviesApi).then(response => response.json()),
    fetch(getGenresApi).then(response => response.json())
  ]);

 


  return { voteCountMovies, highestGrossingMovies, upcomingMovies, genresList };
};

