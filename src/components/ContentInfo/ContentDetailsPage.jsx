import React, { useState, useEffect } from 'react';
import { Play, Star, Info, Calendar, Clock, Heart, ArrowLeft, Share2 } from 'lucide-react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { BiSolidLike } from 'react-icons/bi';
import Cast from "./Cast"
import ExtraInfo from './ExtraInfo';
import SimilarContent from './SimilarContent';

export async function loadImage({ params }) {
    const { type, Id } = params;

    try {
        // Use Promise.allSettled to handle individual promise results
        const [imagesResponse, genresResponse, contentDetailsResponse, similarResponse] = await Promise.allSettled([
            fetch(`https://api.themoviedb.org/3/${type}/${Id}/images?api_key=${import.meta.env.VITE_API_KEY}`),
            fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}`),
            fetch(`https://api.themoviedb.org/3/${type}/${Id}?api_key=${import.meta.env.VITE_API_KEY}`),
            fetch(`https://api.themoviedb.org/3/${type}/${Id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`),
        ]);

        // Helper to handle responses based on Promise.allSettled results
        const handleResponse = (response) => {
            if (response.status === 'fulfilled') {
                return response.value.json ? response.value.json() : response.value.data.data;
            }
            console.error('Request failed:');
            return {}; // Return empty object on failure
        };

        // Wait for all successful responses
        const [imagesData, genresData, contentData, similarData] = await Promise.all([
            handleResponse(imagesResponse),
            handleResponse(genresResponse),
            handleResponse(contentDetailsResponse),
            handleResponse(similarResponse),
        ]);

        return {
            images: imagesData,
            genres: genresData,
            contentDetails: contentData,
            similarContents: similarData?.results || [],
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        // If there's a more critical error, return a fallback response
        return {
            images: {},
            genres: {},
            contentDetails: {},
            similarContents: [],
        };
    }
}

const ContentDetailsPage = () => {
    const [cast, setCast] = useState([]);
    const [reviews, setReview] = useState([]);
    const { type, Id } = useParams();
    const [activeTab, setActiveTab] = useState(type==="tv"? 'Seasons': 'About');
    const navigate = useNavigate();
    const [universeData, setUniverseData] = useState([]);
    const { images, genres, contentDetails, similarContents, historyList } = useLoaderData();
    const imagePath = images.backdrops?.[0]?.file_path; // Using the first image
    const imageUrl = contentDetails ? `https://image.tmdb.org/t/p/original${imagePath}` : '';
    const rating = contentDetails.vote_average ? contentDetails.vote_average.toFixed(1) : 'N/A';

    useEffect(() => {
        if (contentDetails.belongs_to_collection !==null && type === "movie") {
            getUniverse(contentDetails.belongs_to_collection.id)
           }
        getReviews();
        getCast();
        window.scrollTo(0, 0);
    }, [contentDetails]);



    const getGenres = (contentDetails, genres) => {
        const genreMap = new Map(genres?.genres?.map(genre => [genre.id, genre.name]));
        return (contentDetails.genres || [])
            .map(genre => genreMap.get(genre.id))
            .filter(name => name !== undefined);
    };

    const Genres = getGenres(contentDetails, genres);

    const infoArray = ['About', 'Reviews']; // Start with a base array

    if (type === "movie" && contentDetails.belongs_to_collection !== null) {
    infoArray.push('Universe'); // Add 'Universe' for movies with a collection
    } else if (type === "tv") {
    infoArray.unshift('Seasons'); // Add 'Seasons' for series
    }

    const getCast = async () => {
        try {
            const castResponse = await fetch(`https://api.themoviedb.org/3/${type}/${Id}/credits?api_key=${import.meta.env.VITE_API_KEY}`);
            const castData = await castResponse.json();
            setCast(castData.cast);
        } catch (error) {
            console.error('Error fetching cast data:', );
        }
    };

    const getReviews = async () => {
        try {
            const reviewsResponse = await fetch(`https://api.themoviedb.org/3/${type}/${Id}/reviews?api_key=${import.meta.env.VITE_API_KEY}`);
            const reviewsData = await reviewsResponse.json();
            setReview(reviewsData.results);
        } catch (error) {
            console.error('Error fetching reviews data:', error);
        }
    };

    const handlePlay =  () => {
        navigate(playUrl);
    };

    const formatRuntime = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}min`;
    };

    const getUniverse = async (collectionId) => {
        const res = await fetch(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await res.json();
        setUniverseData(data);
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Back button */}
            <div className="absolute top-0 left-0 right-0 p-24 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 rounded-full transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-6 w-6 text-white" />
                </button>
            </div>

            {/* Content Image */}
            <div className="relative h-screen w-full">
                <img
                    src={imageUrl}
                    alt={contentDetails?.title || 'Content image'}
                    className="w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-800 via-black-800/80 to-transparent"></div>
                <div className="absolute bottom-5 left-3 right-0 p-8 space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-shadow-lg">{contentDetails?.title || contentDetails?.name}</h1>
                    
                    {/* Runtime and Genres */}
                    <div className="flex flex-wrap space-x-6 text-lg">
                        {contentDetails?.runtime && (
                            <span className="flex items-center">
                                <Clock className="mr-1" size={20} />
                                {formatRuntime(contentDetails?.runtime || contentDetails?.episode_run_time?.[0])}
                            </span>
                        )}
                        {Genres.length > 0 && (
                            <span className="flex items-center">
                                <Info className="mr-1" size={20} />
                                {Genres.join(', ')}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between mt-4">
                       <div className='flex space-x-4'>
                         <button
                            onClick={() => handlePlay()}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md flex items-center transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 active:bg-red-800 active:scale-95"
                        >
                            <Play className="mr-2" size={20} />
                            Play Now
                        </button>
                       </div>
                       <div className='flex space-x-4'>
                       <button
                            className="border hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md flex items-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <Share2 className="mr-2" size={20} />
                            Share
                        </button>
                        <button
                            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md flex items-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <BiSolidLike className="mr-2" size={20} />
                            Like
                        </button>
                       </div>
                    </div>

                    {/* Storyline Section */}
                    {contentDetails?.overview && (
                        <div className="mt-6 pt-6 ">
                            <h2 className="text-2xl font-bold mb-2">Storyline</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">{contentDetails?.overview}</p>
                        </div>
                    )}
                    
                    
                </div>
                
            </div>

            <div className='bg-gradient-to-t from-black-800 via-black-800 bg-black-800'>
                 <Cast cast={cast} />

                    <div className="flex p-4 flex-wrap gap-4 mx-5 my-12">
                        {infoArray.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-lg font-semibold px-2 py-2  transition-all duration-300 shadow-lg focus:outline-none ${
                                    activeTab === tab
                                        ? ' border-green-700 border-b-2 rounded-md text-white shadow-xl transform scale-105'
                                        : ' text-gray-400 hover:text-white '
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <ExtraInfo seasons={contentDetails.seasons} seriesId={Id} type={type} contentDetails={contentDetails} activeTab={activeTab} reviews={reviews} Genres={Genres} rating={rating} formatRuntime={formatRuntime} universeData={universeData} />
                    <div className='m-auto w-full border-gray-900 py-10 border-b'></div>

                    {similarContents.length!==0 && <SimilarContent type={type} similarContents={similarContents} />}

                    </div>

           
           
        </div>
    );
};

export default ContentDetailsPage;
