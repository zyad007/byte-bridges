import React from "react";
import fav from "../../../public/fav.svg";
import clock from "../../../public/clock.svg";
import paper from "../../../public/paper.svg";
import ExpandableText from "./ExpandableText";
import verified from "../../../public/verified.svg";
import notVerified from "../../../public/notverified.svg";
import Rate from "./Rate";
import ContextMenu from "./ContextMenu";

interface jobProps {
  title: string;
  amount: string;
  description: string;
  posted_at: string;
  type: string;
  scrapped_at: string;
  tags: string;
  clientRate: number;
  client_location: string;
  payment_verfied: boolean;
  proposalsNumber: string;
  clientSpent: string;
}
const Job: React.FC<jobProps> = ({
  title,
  amount,
  description,
  posted_at,
  type,
  // scrapped_at,
  tags,
  clientRate,
  client_location,
  payment_verfied,
  proposalsNumber,
  clientSpent,
}) => {
  return (
    <div className="  font-urbanist shadow h-fit flex flex-col p-4 rounded-lg  cursor-pointer hover:shadow-lg hover:shadow-gray-500/50  ">
      <div className="flex items-start justify-between">
        <h2 className="font-bold   w-[75%]">{title}</h2>
        <img src={fav} alt="fav Icon" className="w-4 h-4 transition-all " />
        <ContextMenu />
      </div>

      <div className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full w-fit font-semibold my-2">
        {type}
      </div>

      <ExpandableText text={description}></ExpandableText>

      <div className="flex justify-between my-2 pr-5">
        <div className="flex items-center">
          <img src={clock} alt="fav Icon" className="w-5 h-5 transition-all " />
          <h1 className="text-xs font-semibold">{posted_at}</h1>
        </div>

        <div className="flex items-center justify-end">
          <img src={paper} alt="fav Icon" className="w-5 h-5 transition-all " />
          <h6 className="text-xs font-semibold w-1/2">
            {proposalsNumber} Proposals
          </h6>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-center text-xs w-[40%] ">{amount}</div>
        <div className="flex justify-center">
          {payment_verfied ? (
            <div className="flex justify-center gap-1 items-center">
              <img src={verified} alt="True Condition" className="w-3 h-3" />
              <div className="text-xs">Payment verified</div>
            </div>
          ) : (
            <div className="flex justify-center gap-1 items-center">
              <img
                src={notVerified}
                alt="False Condition"
                className="w-3 h-3"
              />
              <div className="text-xs">Payment not verified</div>
            </div>
          )}
        </div>
      </div>
      <span className="h-[2px] w-full my-4 bg-[#F3F4F6]"></span>

      <Rate rating={clientRate} />
      <div className="flex justify-between">
        <div className="flex justify-center text-sm ">
          Total spent: ${clientSpent}
        </div>
        <div className="flex justify-center text-sm font-semibold">
          {client_location}
        </div>
      </div>
      <div className="flex my-2 flex-wrap">
        {tags.split(",").map((tag) => {
          return (
            <div className="m-1 bg-[#f3f4f6] text-black text-xs px-2 py-0.5 rounded-full w-fit font-semibold my-2">
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Job;
