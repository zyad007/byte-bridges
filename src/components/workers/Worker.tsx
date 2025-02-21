import { useState } from "react";
import bell from "../../../public/bell.svg";
import completed from "../../../public/completed.svg";
import { useDisclosure } from "@heroui/react";
import WorkerModal from "./Modal";
import { WorkerType } from "../../types/workerTypes";

const Worker: React.FC<WorkerType> = ({
  // id,
  name,
  description,
  status,
  // notify,
  jobCount,
  query,
  jobType,
  fixedPrice,
  proposalsNumber,
  verifiedOnly,
  // previousClientsOnly, //gdeda
  // updatedAt,
  // createdAt,
  ip,

  // toggle,
}) => {
  const statusStyle = {
    ACTIVE: "bg-[#F0FDF4] text-[#15803D]",

    INACTIVE: "bg-[#FEF2F2] text-[#B91C1C]",
  }[status];
  // const [toggleSwitch, setToggleSwitch] = useState(toggle);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className=" shadow flex flex-col p-4 rounded-lg  cursor-pointer hover:shadow-lg hover:shadow-gray-500/50 "
      onClick={onOpen}
    >
      <WorkerModal
        query={query}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        name={name}
        description={description}
        jobType={jobType}
        // ip={ip}
        status={status}
        fixedPrice={fixedPrice as "fixed" | "hourly"}
        verifiedOnly={verifiedOnly}
        proposalsNumber={proposalsNumber}
      />
      <div className="flex justify-between items-start">
        <div className="text-sm text-[#6B7280]">IP:{ip}</div>
        <img src={bell} alt="fav Icon" className="w-4 h-4 transition-all " />
      </div>
      <div className="flex text-sm font-semibold my-2">{name}</div>
      <div className="flex  items-center text-sm text-[#6B7280]">
        {jobCount > 0 && (
          <img
            src={completed}
            alt="fav Icon"
            className="w-4 h-4 transition-all mr-0.5 "
          />
        )}
        {jobCount} jobs completed
      </div>{" "}
      <div className="flex justify-between items-start my-2">
        {/* <Switch
          size="sm"
          aria-label="Automatic updates"
          color={toggleSwitch ? "success" : "danger"}
          isSelected={toggleSwitch}
          onValueChange={setToggleSwitch}
        /> */}

        <div
          className={`text-xs px-2 py-0.5 rounded-full w-fit font-bold my-2 ${statusStyle}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default Worker;
