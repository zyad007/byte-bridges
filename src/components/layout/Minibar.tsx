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
      className={`flex items-center    rounded-lg cursor-pointer transition-all duration-300
      ${isActive ? "bg-gray-300 font-semibold" : "bg-transparent"}
      ${isCollapsed ? "gap-4 pl-3 py-2  " : " pl-4 py-2 ml-2  gap-2 "}
    `}
    >
      <img
        src={imageUrl}
        alt={`${text} Icon`}
        className={` transition-all duration-300 ${
          isActive ? "filter grayscale brightness-0" : ""
        } ${isCollapsed ? "w-6 h-6" : "w-6 h-6"}`}
      />
      <p
        className={`text-sm md:text-base transition-all duration-300 ${
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Minibar;
