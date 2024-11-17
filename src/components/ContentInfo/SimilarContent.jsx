import React from 'react'
import ContentCard from '../common/ContentCard'
import { useNavigate} from "react-router-dom"
function SimilarContent({similarContents, type}) {

  const title = type === "tv"? "TV Show" : "Movies"
  const navigate = useNavigate();

  const handlePlay = (content, type) => {
    navigate(`/${type}/${content.id}`)
  }

  return (
    <div className="mt-12 ml-12 pb-5">
    <h2 className="text-3xl font-bold text-white mb-6">Similar {title} For You</h2>
    <div className="flex overflow-x-scroll scrollbar-hide">
        {similarContents.length !== 0 && similarContents.slice(0,12).map((content, index) => (
            <div className="flex flex-none w-auto shadow-lg rounded-lg overflow-hidden  transition-transform transform hover:scale-105" key={index}>
                <ContentCard shape="portrait" onClick={(content, type) => handlePlay(content, type)} contentDetails={content} />
            </div>
        ))}
    </div>
</div>
  )
}

export default SimilarContent