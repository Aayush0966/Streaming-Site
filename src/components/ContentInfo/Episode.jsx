import { Clock, Calendar } from 'lucide-react';

const Episode = ({ episode }) => {
    return (
        <div className="cursor-pointer w-64 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden group">
            {/* Episode Image */}
            <div className="relative h-40">
                <img 
                    src={`https://image.tmdb.org/t/p/original/${episode.still_path}`} 
                    alt={episode.name} 
                    className={`w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110`}
                />
            </div>

            {/* Episode Details */}
            <div className="p-4">
                <h3 className={`text-lg font-bold text-white mb-1 truncate`}>{episode.name}</h3>
                <div className=" items-center  text-sm text-gray-300">
                    <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        Episode: <span className="font-semibold">{episode.episode_number}</span>
                    </span>
                    <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        Duration: <span className="font-semibold">{episode.runtime ? `${episode.runtime} min` : 'N/A'}</span>
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Episode;
