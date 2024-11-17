import { useLoaderData } from 'react-router-dom';
import CategorySection from '../common/CategorySection';
import HeroSection from '../Header/HeroSection';


export default function Home() {
  const { topRatedSeries, fanFavorite, nowPlaying, trendingMovies, bestGrossingMovies, historyList } = useLoaderData();
  

  return (
    <div className="min-h-screen bg-black-800 text-gray-100">
      <HeroSection type="movie" contents={fanFavorite.results} />
      <div className=" w-auto  md:px-8">
        <div className="space-y-8">
         <CategorySection  type="Trending Now" contentDetails={trendingMovies.results} />
          <CategorySection type="Fan Favorite" contentDetails={fanFavorite.results} />
          <CategorySection type="Now Playing" contentDetails={nowPlaying.results} />
          <CategorySection type="Top Rated TV Shows" contentDetails={topRatedSeries.results} />
          <CategorySection type="Highest Grossing Movies" contentDetails={bestGrossingMovies.results} />
        </div>
      </div>
    </div>
  );
}

export const getContentDetails = async () => {
  const apiEndpoints = {
    popularSeries: `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&language=en-US&page=1`,
    topRatedSeries: `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&language=en-US&page=1`,
    fanFavorite: `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=vote_count.desc`,
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&language=en-US&page=1`,
    trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&language=en-US`,
    bestGrossingMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&include_adult=true&include_video=false&language=en-US&page=1&sort_by=revenue.desc`,
  };

  const fetchWithErrorHandling = async (url, endpointName) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpointName}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return { results: [] }; // Return empty data as a fallback
    }
  };



  try {
    const [
      popularSeries,
      topRatedSeries,
      fanFavorite,
      nowPlaying,
      trendingMovies,
      bestGrossingMovies,
    ] = await Promise.all([
      fetchWithErrorHandling(apiEndpoints.popularSeries, 'popular series'),
      fetchWithErrorHandling(apiEndpoints.topRatedSeries, 'top-rated series'),
      fetchWithErrorHandling(apiEndpoints.fanFavorite, 'fan favorite movies'),
      fetchWithErrorHandling(apiEndpoints.nowPlaying, 'now playing movies'),
      fetchWithErrorHandling(apiEndpoints.trendingMovies, 'trending movies'),
      fetchWithErrorHandling(apiEndpoints.bestGrossingMovies, 'best grossing movies'),
    ]);

    return {
      popularSeries,
      topRatedSeries,
      fanFavorite,
      nowPlaying,
      trendingMovies,
      bestGrossingMovies,
    };
  } catch (error) {
    console.error('Unexpected error in getContentDetails:', error);
    return {
      popularSeries: { results: [] },
      topRatedSeries: { results: [] },
      fanFavorite: { results: [] },
      nowPlaying: { results: [] },
      trendingMovies: { results: [] },
      bestGrossingMovies: { results: [] },
    }; // Return default empty objects in case of error
  }
};
