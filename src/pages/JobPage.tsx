import { JobType } from "../types/jobTypes";
import Job from "../components/jobs/Job";
import Searchbar from "../../src/components/layout/Searchbar";
import Sidebar from "../../src/components/layout/Sidebar";
import { useSidebar } from "../context/SidebarContext";
import config from "../../config";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Spinner } from "@heroui/react";
import Filter from "../components/jobs/Filter";
import Filters from "../types/filterTypes";

export function JobPage() {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({});
  const [query, setQuery] = useState<string>("");
  const { isCollapsed } = useSidebar();
  const token = Cookies.get("token");
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [Fav, setFav] = useState(false);

  function handleGetFavourite() {
    if (Fav) {
      fetchFavJobs();
    } else {
      fetchJobs();
    }
  }
  async function fetchJobs() {
    setLoading(true);
    const response = await fetch(`${config.BASE_URL}/jobs?page=1&limit=1000`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        ...selectedFilters,
      }),
    });

    const jobs = await response.json();
    setJobs(jobs);
    console.log("jobs", jobs);
    setLoading(false);
  }
  async function fetchFavJobs() {
    setLoading(true);
    const response = await fetch(`${config.BASE_URL}/jobs/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const jobs = await response.json();
    setJobs(jobs);
    setLoading(false);
  }

  useEffect(() => {
    handleGetFavourite();
  }, [Fav, query, selectedFilters]);

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
            <Searchbar query={query} setQuery={setQuery} />
            <Filter
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <Button
              isIconOnly
              variant="bordered"
              className="bg-transparent shadow-none mx-2 w-fit min-w-0 px-4 font-bold"
              onPress={() => setFav((prev) => !prev)}
            >
              Favourites
            </Button>
          </div>
          <span className="h-[2px] w-full mb-4 bg-[#F3F4F6]"></span>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-3 gap-5 p-5 max-md:grid-cols-1">
            {[0, 1, 2].map((col) => (
              <div key={col} className="flex flex-col gap-4">
                {jobs?.length > 0 &&
                  jobs.map((job: JobType, index: number) => {
                    if (job.id && index % 3 === col) {
                      return <Job key={job.id} {...job} />;
                    }
                    return null;
                  })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
