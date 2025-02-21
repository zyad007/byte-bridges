import { JobType } from "../types/jobTypes";
import Filter from "../components/jobs/Filter";
import Job from "../components/jobs/Job";
import Searchbar from "../../src/components/layout/Searchbar";
import Sidebar from "../../src/components/layout/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import config from "../../config";
import { useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";

export function JobPage() {
  const [selectedFilters, setSelectedFilters] = useState({ query: "" });
  const { isCollapsed } = useSidebar();

  const token = Cookies.get("token");

  const { response: jobs, error } = useFetch<JobType[]>(
    `${config.BASE_URL}/jobs?page=1&limit=10`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(selectedFilters),
    }
  );

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setSelectedFilters((prev) => ({ ...prev, query }));
  };

  return (
    <div className="w-screen h-screen flex justify-start font-urbanist">
      <div className={`h-full ${isCollapsed ? "w-fit" : "w-[17%]"}`}>
        <Sidebar />
      </div>

      <div
        className={`flex w-[83%] h-full p-5 flex-col overflow-y-scroll ${
          isCollapsed ? "w-full" : "w-[83%]"
        }`}
      >
        <div className="w-full flex flex-col">
          <div className="w-full flex">
            <Searchbar onSearch={handleSearch} />
            <Filter />
          </div>
          <span className="h-[2px] w-full mb-4 bg-[#F3F4F6]"></span>
        </div>
        <div className="grid grid-cols-3 gap-5 p-5 max-md:grid-cols-1">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex flex-col gap-4">
              {jobs?.length > 0 &&
                jobs.map((job: JobType, index: number) => {
                  if (index % 3 === col) {
                    return <Job key={job.id || index} {...job} />;
                  }
                  return null;
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
