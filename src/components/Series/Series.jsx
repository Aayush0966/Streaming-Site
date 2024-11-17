import React, { useEffect, useState } from 'react';
import CategorySection from '../common/CategorySection';
import { useLoaderData } from 'react-router-dom';
import HeroSection from '../Header/HeroSection';
import ExploreByGenre from '../Movies/ExploreByGenre';
import { fetchContentByGenre } from '../../Utils/Utils';

function Series() {
  const { voteCountSeries, highestRatedSeries,  mindBending } = useLoaderData();
  const [seriesByGenre, setSeriesByGenre] = useState([]);
  const [genreName, setGenreName] = useState([]);

  const showSeriesByGenre =async (genreId, genreName) => {
    setGenreName(genreName);
    const series = await fetchContentByGenre('tv', genreId, 'vote_count.desc');
    setSeriesByGenre(series);
  }


  useEffect(( )=> {
    window.scrollTo(0, 0);
    showSeriesByGenre(10759, 'Action and Adventure')
  }, [])
  return (
    <>
    <div className="min-h-screen bg-black-800 text-gray-100">

      <HeroSection type="tv" contents={mindBending.results} />

      <div className="px-4  md:px-8 lg:px-12 space-y-8 ">
        <CategorySection contentDetails={voteCountSeries.results} type="Fans Favorite"  />
        <CategorySection contentDetails={highestRatedSeries.results} type="Highest Rated Series" />
        <div className="-mx-12">
        <ExploreByGenre contentList={(genreId, genreName) => showSeriesByGenre(genreId, genreName)} type='tv' />
        </div>
        <CategorySection contentDetails={seriesByGenre} type={`${genreName} TV Shows`} />
        <CategorySection contentDetails={mindBending.results} type="Mind-Bending Thrillers" />
      </div>
    </div>
    </>
  );
}

export default Series;



export const discoverSeries = async () => {
  const api1 = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1&include_adult=true&sort_by=vote_count.desc`;
  const api2 = `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}&language=en-USinclude_adult=true`;
  const warriorsLegacyApi = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&with_genres=10768include_adult=true`;
  const getGenresApi = `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_API_KEY}&language=en`;
  const mindBendingApi = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&with_genres=9648`;

  const [voteCountSeries, highestRatedSeries, warriorsLegacy, genresList, mindBending] = await Promise.all([
    fetch(api1).then(response => response.json()),
    fetch(api2).then(response => response.json()),
    fetch(warriorsLegacyApi).then(response => response.json()),
    fetch(getGenresApi).then(response => response.json()),
    fetch(mindBendingApi).then(response => response.json())
  ]);

  return { voteCountSeries, highestRatedSeries, warriorsLegacy, genresList, mindBending};
};
