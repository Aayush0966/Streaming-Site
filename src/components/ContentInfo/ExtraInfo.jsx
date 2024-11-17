import React, { useState, useEffect } from 'react';
import ReviewCard from './Review';
import ReviewForm from './ReviewForm';
import { Star, Video, User, Calendar, Tag, Clock, AlignLeft, Globe, DollarSign, MapPin, Film, Building, ChevronRight, ChevronLeft } from 'lucide-react';
import ContentCard from '../common/ContentCard';
import Episode from './Episode';
import { useNavigate } from 'react-router-dom';

function ExtraInfo({ contentDetails, seasons, seriesId, type, activeTab, reviews, rating, universeData }) {
    const [seasonNumber, setSeasonNumber] = useState(1); // Default to the first season
    const [episodes, setEpisodes] = useState({});
    const [currentSeason, setCurrentSeason] = useState(null); // New state for current season details
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const seasonList = type === 'tv' ? seasons.filter(season => season.season_number !== 0) : [];


    // Fetch episodes data for TV shows only
    const getEpisodes = async (seasonNumber) => {
        if (type === 'tv') {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=${import.meta.env.VITE_API_KEY}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const episodeData = await response.json();
                setEpisodes(prev => ({ ...prev, [seasonNumber]: episodeData.episodes }));
            } catch (error) {
                console.error('Error fetching episodes data:', error);
            }
        }
    };

    const playEP = (episode) => {
        if (type === 'tv') {
            navigate(`/watch/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`);
        }
    };

    // Update current season details based on selected season
    const handleSeasonChange = (e) => {
        const selectedSeasonNumber = parseInt(e.target.value);
        if (type === 'tv') {
            setSeasonNumber(selectedSeasonNumber); // Update season number
            getEpisodes(selectedSeasonNumber); // Fetch episodes data for the selected season
            const selectedSeason = seasonList.find(season => season.season_number === selectedSeasonNumber); // Get season details
            setCurrentSeason(selectedSeason); // Update current season details
        }
    };

    const InfoRow = ({ icon, label, children }) => (
        <div className="flex items-center">
          {icon}
          <span className="font-semibold">{label}:</span>
          <span className="ml-2">{children}</span>
        </div>
      );
    useEffect(() => {
        if (type === 'tv') {
            const defaultSeason = seasonList[0];
            setCurrentSeason(defaultSeason); // Set default season on load
            setSeasonNumber(1); // Reset to the first season
            getEpisodes(1); // Fetch episodes data for the first season
        }
    }, [seriesId, type]);

    const isTVShow = type === "tv"; // Check if content is a TV show

    return (
        <div>
            {    activeTab === "About" && (
      <div className="text-white p-6 rounded-lg w-auto mx-10 bg-black-700 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <Video className="mr-2" size={24} />
          {contentDetails.title || contentDetails.name}
        </h2>

    

        <div className="space-y-4">
          <InfoRow icon={<User className="mr-2" size={22} />} label="Creator">
            {isTVShow ? contentDetails.created_by[0]?.name : contentDetails.director || 'N/A'}
          </InfoRow>

          <InfoRow icon={<Star className="mr-2 text-yellow-400" size={22} />} label="Stars">
            {rating}
          </InfoRow>

          <InfoRow icon={<Calendar className="mr-2" size={22} />} label={isTVShow ? "First Air" : "Release"}>
            {isTVShow ? contentDetails.first_air_date : contentDetails.release_date}
          </InfoRow>

          {isTVShow && (
            <InfoRow icon={<Calendar className="mr-2" size={22} />} label="Last Air">
              {contentDetails.last_air_date}
            </InfoRow>
          )}

          {isTVShow && (
            <>
              <InfoRow label="Seasons">
                {contentDetails.number_of_seasons}
              </InfoRow>
              <InfoRow label="Episodes">
                {contentDetails.number_of_episodes}
              </InfoRow>
            </>
          )}

          <InfoRow icon={<Tag className="mr-2" size={22} />} label="Tagline">
            <span className="italic">"{contentDetails.tagline || 'N/A'}"</span>
          </InfoRow>

          <InfoRow icon={<AlignLeft className="mr-2" size={22} />} label="Overview">
            <p className="text-gray-300 leading-relaxed">{contentDetails.overview}</p>
          </InfoRow>

          {/* Budget and Revenue (Movies only) */}
          {!isTVShow && (
            <>
              <InfoRow icon={<DollarSign className="mr-2" size={22} />} label="Budget">
                ${contentDetails.budget?.toLocaleString() || 'N/A'}
              </InfoRow>
              <InfoRow icon={<DollarSign className="mr-2" size={22} />} label="Revenue">
                ${contentDetails.revenue?.toLocaleString() || 'N/A'}
              </InfoRow>
            </>
          )}

          {/* Runtime (Movies only) */}
          {!isTVShow && (
            <InfoRow icon={<Clock className="mr-2" size={22} />} label="Runtime">
              {contentDetails.runtime ? `${contentDetails.runtime} min` : 'N/A'}
            </InfoRow>
          )}

          {/* Spoken Languages */}
          <InfoRow icon={<Globe className="mr-2" size={22} />} label="Languages">
            {contentDetails.spoken_languages.map(lang => lang.english_name).join(', ') || 'N/A'}
          </InfoRow>

          {/* Origin Country */}
          <InfoRow icon={<MapPin className="mr-2" size={22} />} label="Origin Country">
            {contentDetails.origin_country?.join(', ') || 'N/A'}
          </InfoRow>
        </div>

        {/* Genres */}
        <div className="mt-4">
          <InfoRow icon={<Film className="mr-2" size={22} />} label="Genres">
            <div className="flex flex-wrap gap-2 mt-2">
              {contentDetails.genres.map((genre, index) => (
                <span key={index} className="bg-gray-700 text-sm rounded-full px-3 py-1 hover:bg-gray-600 transition-all duration-300">
                  {genre.name}
                </span>
              ))}
            </div>
          </InfoRow>
        </div>

        {/* Production Companies */}
        <div className="mt-4">
          <InfoRow icon={<Building className="mr-2" size={22} />} label="Production Companies">
            <div className="flex flex-wrap gap-2 mt-2">
              {contentDetails.production_companies.map((company, index) => (
                <span key={index} className="bg-gray-700 text-sm rounded-full px-3 py-1 hover:bg-gray-600 transition-all duration-300">
                  {company.name}
                </span>
              ))}
            </div>
          </InfoRow>
        </div>


        {isTVShow && (
          <>
            <InfoRow icon={<ChevronRight className="mr-2" size={22} />} label="Next Episode">
              <span className="ml-2">{contentDetails.next_episode_to_air?.name || 'N/A'}</span>
            </InfoRow>
            <InfoRow icon={<ChevronLeft className="mr-2" size={22} />} label="Last Episode">
              <span className="ml-2">{contentDetails.last_episode_to_air?.name || 'N/A'}</span>
            </InfoRow>
          </>
        )}
        </div>
            )}
        
  

            {/* Seasons Section (TV shows only) */}
            {activeTab === "Seasons" && isTVShow && currentSeason && (
                <div className="relative mx-4 md:mx-10 p-4">
                    <div className="flex">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${currentSeason.poster_path}`}
                            alt={currentSeason.name || 'Content image'}
                            className="w-auto h-96 object-cover rounded-lg shadow-lg"
                        />
                        <div className="lg:ml-6 p-6 text-white">
                            <h2 className="text-4xl font-bold mb-2">{currentSeason.name}</h2>
                            <p className="text-gray-200 text-lg mb-4">
                                {currentSeason.overview || 'No overview available.'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center mb-6 justify-between">
                            <h4 className="text-2xl font-semibold items-center text-white mb-4">Seasons</h4>
                            <select
                                className="border p-2 text-white bg-gray-900 rounded-lg shadow-lg"
                                value={seasonNumber}
                                onChange={handleSeasonChange}
                            >
                                {seasonList.map((season) => (
                                    <option key={season.id} value={season.season_number}>
                                        Season {season.season_number}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Scrollable episode section */}
                        <div className="overflow-x-auto flex scrollbar-hide space-x-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                            {episodes[seasonNumber]?.map((episode) => (
                                <div
                                    key={episode.id}
                                    className="p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                    onClick={() => playEP(episode)}
                                >
                                    <Episode seriesId={seriesId} episode={episode} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            {activeTab === "Reviews" && (
                <div className="mx-4 md:mx-10">
                    <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <ReviewForm />

                </div>
            )}

            {/* Universe Section */}
            {activeTab === "Universe" && (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 p-4">
                    {universeData.map((movie) => (
                        <ContentCard key={movie.id} content={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExtraInfo;
