// //
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const Rate = ({ rating }: { rating: number }) => {
//   // Clamp the rating between 0 and 5
//   const clampedRating = Math.min(5, Math.max(0, rating));

//   const fullStars = Math.floor(clampedRating);
//   const hasHalfStar = clampedRating % 1 !== 0;
//   const emptyStars = Math.max(5 - fullStars - (hasHalfStar ? 1 : 0), 0); // Ensure non-negative

//   return (
//     <div className="flex items-center space-x-1 text-yellow-500">
//       {/* Render full stars */}
//       {[...Array(fullStars)].map((_, index) => (
//         <FaStar key={index} />
//       ))}

//       {/* Render half star if applicable */}
//       {hasHalfStar && <FaStarHalfAlt />}

//       {/* Render empty stars */}
//       {[...Array(emptyStars)].map((_, index) => (
//         <FaRegStar key={index} />
//       ))}

//       {/* Display numeric rating */}
//       <span className="text-gray-500 text-sm ml-1">({clampedRating})</span>
//     </div>
//   );
// };

// export default Rate;
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rate = ({ rating }: { rating?: number }) => {
  // Default to 0 if rating is null, undefined, or not a valid number
  const safeRating = typeof rating === "number" ? rating : 0;
  const clampedRating = Math.min(5, Math.max(0, safeRating));

  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 !== 0;
  const emptyStars = Math.max(5 - fullStars - (hasHalfStar ? 1 : 0), 0); // Ensure non-negative

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
      <span className="text-gray-500 text-sm ml-1">({clampedRating})</span>
    </div>
  );
};

export default Rate;
