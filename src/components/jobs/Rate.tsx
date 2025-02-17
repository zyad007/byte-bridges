import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rate = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex items-center space-x-1 text-yellow-500">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} />
      ))}

      {/* Render half star if applicable */}
      {hasHalfStar && <FaStarHalfAlt />}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} />
      ))}

      {/* Display numeric rating */}
      <span className="text-gray-500 text-sm ml-1">({rating})</span>
    </div>
  );
};

export default Rate;
