// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Minibar from "./Minibar";
import { useSidebar } from "../../context/SidebarContext";

import data from "../../../public/data.svg";
import job from "../../../public/job.svg";
import settings from "../../../public/settings.svg";
import workers from "../../../public/workers.svg";
import collapse from "../../../public/collapse.svg";

const Sidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center font-bold text-indigo-600 text-xl">
          LOGO
        </div>
        <img
          src={collapse}
          alt="Collapse Icon"
          className="w-5 h-5 cursor-pointer transition-all"
          onClick={toggleSidebar}
        />
      </div>

      <span className="h-[5px] w-full mb-4 bg-red"></span>

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
  );
};

export default Sidebar;
