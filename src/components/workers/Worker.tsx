import { useState } from "react";
import bell from "../../../public/bell.svg";
import completed from "../../../public/completed.svg";
import { useDisclosure, Switch } from "@heroui/react";
import WorkerModal from "./Modal";
interface workerProps {
  ip: string;
  name: string;
  jobs_completed: number;
  status: string;
  payement: string;
  toggle: boolean;
  // alert: boolean;
  payment_verfied: boolean;
  propsal_count: string;
}
const Worker: React.FC<workerProps> = ({
  ip,
  name,
  jobs_completed,
  status,
  payement,
  toggle,
  // alert,
  payment_verfied,
  propsal_count,
}) => {
  const statusStyle = {
    running: "bg-[#F0FDF4] text-[#15803D]",
    paused: "bg-[#FEFCE8] text-[#A16207]",
    inactive: "bg-[#FEF2F2] text-[#B91C1C]",
  }[status];
  const [toggleSwitch, setToggleSwitch] = useState(toggle);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className=" shadow h-fit flex flex-col p-4 rounded-lg  cursor-pointer hover:shadow-lg hover:shadow-gray-500/50 "
      onClick={onOpen}
    >
      <WorkerModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        name={name}
        ip={ip}
        status={status}
        payement={payement as "fixed" | "hourly"}
        payment_verfied={payment_verfied}
        propsal_count={propsal_count}
      />
      <div className="flex justify-between items-start">
        <div className="text-sm text-[#6B7280]">IP:{ip}</div>
        <img src={bell} alt="fav Icon" className="w-4 h-4 transition-all " />
      </div>
      <div className="flex text-sm font-semibold my-2">{name}</div>
      <div className="flex  items-center text-sm text-[#6B7280]">
        <img
          src={completed}
          alt="fav Icon"
          className="w-4 h-4 transition-all mr-0.5 "
        />
        {jobs_completed} jobs completed
      </div>{" "}
      <div className="flex justify-between items-start my-2">
        <Switch
          size="sm"
          aria-label="Automatic updates"
          color={toggleSwitch ? "success" : "danger"}
          isSelected={toggleSwitch}
          onValueChange={setToggleSwitch}
        />

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
