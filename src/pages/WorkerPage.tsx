import { WorkerType } from "../types/workerTypes";
import Searchbar from "../components/layout/Searchbar";
import Sidebar from "../components/layout/Sidebar";
import Worker from "../components/workers/Worker";
import { useSidebar } from "../context/SidebarContext";
import { useEffect, useState } from "react";
import config from "../../config";
import Cookies from "js-cookie";

export function WorkerPage() {
  const { isCollapsed } = useSidebar();
  const [workers, setWorkers] = useState<WorkerType[]>([]);

  const handleSearch = (query: string) => {
    console.log("Searching ", query);
  };
  async function queryAllWokrers() {
    const token = Cookies.get("token");
    const res = await fetch(config.BASE_URL + `/workers?search=t`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const workers: WorkerType[] = await res.json();
    setWorkers(workers);
    console.log(workers);
  }
  useEffect(() => {
    queryAllWokrers();
  }, []);
  return (
    <div className="w-screen h-screen flex justify-start font-urbanist ">
      <div
        className={` h-full
       ${isCollapsed ? "w-fit" : "w-[17%]"}  
       `}
      >
        <Sidebar></Sidebar>
      </div>

      <div
        className={`flex  h-full p-5 flex-col overflow-y-scroll
              ${isCollapsed ? "w-full" : "w-[83%]"}  
       `}
      >
        <div className=" w-full  flex flex-col  ">
          <div className="w-full  flex">
            {" "}
            <Searchbar
              query=""
              setQuery={handleSearch as (value: string) => void}
            ></Searchbar>
          </div>
          <span className="h-[2px] w-full mb-4 bg-[#F3F4F6]"></span>
          {/* <div>filter</div> */}
        </div>

        <div className="grid grid-cols-3 gap-5 p-5 max-md:grid-cols-1">
          {workers.map((worker, index) => {
            return <Worker key={index} {...worker} />;
          })}
        </div>
      </div>
    </div>
  );
}
