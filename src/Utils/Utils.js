export const fetchGenres = async (type) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = response.json();
    return data;

}

export const fetchContentByGenre = async (type, genreId, sortBy = 'popularity.desc') => {
  const baseUrl = 'https://api.themoviedb.org/3';
  const endpoint = `${baseUrl}/discover/${type}?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${genreId}&include_adult=true&sort_by=${sortBy}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results; // Return the array of movies
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // Return an empty array on error
  }
};


export const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
};

export const getGenres = (contentDetails, genres) => {
    const genreMap = new Map(genres.genres.map(genre => [genre.id, genre.name]));
    return (contentDetails.genres || [])
        .map(genre => genreMap.get(genre.id))
        .filter(name => name !== undefined);
};
