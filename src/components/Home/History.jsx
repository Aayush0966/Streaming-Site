import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../common/ContentCard';

export default function History({ contentDetails, type, shape }) {
  const navigate = useNavigate();
  
  const handleClick = (content) => {
   const url = content.type === 'tv'? `/watch/tv/${content.contentId}/${content.last_season_watched}/${content.last_episode_watched}` : `/watch/movie/${content.contentId}`;
    navigate(url); // Use contentId for navigation
  };

  const calculateTVShowProgress = (showProgress) => {
    let totalWatched = 0;
    let totalDuration = 0;

    // Loop through each episode's progress and sum up watched and duration
    Object.values(showProgress).forEach((episode) => {
      totalWatched += episode.progress?.watched || 0;
      totalDuration += episode.progress?.duration || 0;
    });

    return totalDuration > 0 ? (totalWatched / totalDuration) * 100 : 0; // Return percentage watched
  };

  return (
    <section className="relative w-full px-4 mx-auto rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-afacad text-white">{type}</h2>
      </div>

      <div className={`flex ${shape === "portrait" ? '' : 'gap-6'} overflow-auto scrollbar-hide`}>
        {contentDetails.slice(0, 12).map((content, index) => {
          let progressPercentage = 0;

          if (content.type === 'movie') {
            // For movies, calculate based on progress field
            const watched = content.progress?.watched || 0;
            const duration = content.progress?.duration || 1; // Avoid division by 0
            progressPercentage = (watched / duration) * 100;
          } else if (content.type === 'tv') {
            // For TV shows, calculate based on show_progress field
            progressPercentage = calculateTVShowProgress(content.show_progress);
          }

          return (
            <div 
              key={index} 
              className="relative group rounded-lg" 
              
            >
              <ContentCard 
                contentDetails={content} 
                shape={shape} 
                onClick={() => handleClick(content)}
              />
              
              {/* Display progress bar only if there's progress */}
              {progressPercentage > 0 && (
                <div className="bottom-0 left-0 w-full h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-red-600 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
