import { useState } from "react";

const ExpandableText = ({ text }: { text?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <div className="text-gray-800 text-sm font-semibold ">
      <p>
        {isExpanded ? text : `${text?.slice(0, text?.length / 3)}...`}{" "}
        {/* Truncate text */}
        <span
          onClick={toggleExpansion}
          className="text-blue-400   hover:underline mt-1 cursor-pointer"
        >
          {isExpanded ? "See Less" : "See More"}
        </span>
      </p>
    </div>
  );
};

export default ExpandableText;
