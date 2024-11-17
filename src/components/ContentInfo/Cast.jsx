import React from 'react'

function Cast({cast}) {
  return (
    <div className='p-10 '>
    <h2 className="text-2xl font-bold mb-5">Top Cast</h2>
      <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
      {cast.slice(0,12).map((member) => (
              <div key={member.id} className="flex-none flex items-center space-x-4">
              {/* Cast Image */}
              <img
                  src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover shadow-md"
              />

              {/* Cast Info */}
              <div className="text-white">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.character}</p>
              </div>
              </div>
          ))}
          </div>
    </div>
  )
}

export default Cast