import Filter from "../components/jobs/Filter";
import Searchbar from "../components/layout/Searchbar";
import Sidebar from "../components/layout/Sidebar";
import Worker from "../components/workers/Worker";
import { useSidebar } from "../context/SidebarContext";
export const workerPage = () => {
  const { isCollapsed } = useSidebar();
  const workers = [
    {
      ip: "192.168.1.101",
      name: "Assembly Line Robot",
      jobs_completed: 12,
      status: "running",
      toggle: true,
      notify_me: false,
      payement: "hourly",
      payment_verfied: false,
      propsal_count: "20+ Proposals",
    },
    {
      ip: "192.168.1.102",
      name: "Welding Robot",
      jobs_completed: 8,
      status: "paused",
      toggle: true,
      notify_me: true,
      payement: "hourly",
      payment_verfied: true,
      propsal_count: "20+ Proposals",
    },
    {
      ip: "192.168.1.103",
      name: "Packaging Robot",
      jobs_completed: 15,
      status: "inactive",
      toggle: false,
      notify_me: false,
      payement: "fixed",
      payment_verfied: false,
      propsal_count: "20+ Proposals",
    },
    {
      ip: "192.168.1.104",
      name: "Paint Spraying Robot",
      jobs_completed: 4,
      status: "running",
      toggle: true,
      notify_me: true,
      payement: "fixed",
      payment_verfied: true,
      propsal_count: "20+ Proposals",
    },
    {
      ip: "192.168.1.105",
      name: "Inspection Robot",
      jobs_completed: 19,
      status: "running",
      toggle: true,
      notify_me: false,
      payement: "fixed",
      payment_verfied: false,
      propsal_count: "20+ Proposals",
    },
    {
      ip: "192.168.1.106",
      name: "Material Handling Robot",
      jobs_completed: 7,
      status: "paused",
      toggle: true,
      notify_me: true,
      payement: "fixed",
      payment_verfied: false,
      propsal_count: "20+ Proposals",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching ", query);
  };
  return (
    <div className="w-screen h-screen flex justify-start ">
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
            <Searchbar onSearch={handleSearch}></Searchbar>
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
};
