import React from "react";
import { useSidebar } from "../../context/SidebarContext";
interface MinibarProps {
  imageUrl: string;
  text: string;
  isActive: boolean;
}

const Minibar: React.FC<MinibarProps> = ({ imageUrl, text, isActive }) => {
  const { isCollapsed } = useSidebar();
  return (
    <div
      className={`ml-2 flex items-center gap-2 pl-4 py-2 rounded-lg cursor-pointer transition-all
      ${isActive ? "bg-gray-300 font-semibold" : "bg-transparent"}
    `}
    >
      <img
        src={imageUrl}
        alt={`${text} Icon`}
        className={`w-6 h-6 transition-all ${
          isActive ? "filter grayscale brightness-0" : ""
        }`}
      />
      {!isCollapsed && <p className="text-sm md:text-base">{text}</p>}
    </div>
  );
};

export default Minibar;
