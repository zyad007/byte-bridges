import { NavLink } from "react-router-dom";
import Minibar from "./Minibar";
import { useSidebar } from "../../context/SidebarContext";

import data from "../../../public/data.svg";
import job from "../../../public/job.svg";
import settings from "../../../public/settings.svg";
import workers from "../../../public/workers.svg";

import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Sidebar = () => {
  const { toggleSidebar, isCollapsed } = useSidebar();

  return (
    <div
      className={`w-full h-full transition-all duration-300 ease-in-out bg-gray-100  ${
        isCollapsed ? "w-16 p-2" : "w-64 p-4"
      }`}
    >
      {/* Sidebar Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-center font-bold text-indigo-600 text-xl">
            LOGO
          </div>
        </div>
        <span className="h-[5px] w-full mb-4 bg-red-500"></span>
        <NavLink to="/">
          {({ isActive }) => (
            <Minibar imageUrl={job} text="Jobs" isActive={isActive} />
          )}
        </NavLink>
        <NavLink to="/worker">
          {({ isActive }) => (
            <Minibar imageUrl={workers} text="Workers" isActive={isActive} />
          )}
        </NavLink>
        <NavLink to="/settings">
          {({ isActive }) => (
            <Minibar imageUrl={settings} text="Settings" isActive={isActive} />
          )}
        </NavLink>
        <NavLink to="/data">
          {({ isActive }) => (
            <Minibar imageUrl={data} text="Data" isActive={isActive} />
          )}
        </NavLink>
      </div>
      <div className="relative">
        {!isCollapsed ? (
          <div
            className="bg-gray-100 flex justify-end items-center cursor-pointer border-3  border-blue-500 hover:border-gray-500 rounded-full p-2 w-8 h-8 absolute top-[70px] -right-7 transition-all duration-300"
            onClick={toggleSidebar}
          >
            <MdOutlineKeyboardDoubleArrowLeft className="w-5 h-5 text-gray-500" />
          </div>
        ) : (
          <div
            className="bg-gray-100 flex justify-center items-center cursor-pointer border-3  border-blue-500 hover:border-gray-500 rounded-full p-2 w-8 h-8 absolute top-[70px] -right-5 transition-all duration-300"
            onClick={toggleSidebar}
          >
            <MdOutlineKeyboardDoubleArrowRight className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
