import React, { useState } from "react";
import clock from "../../../public/clock.svg";
import paper from "../../../public/paper.svg";
import ExpandableText from "./ExpandableText";
import verified from "../../../public/verified.svg";
import notVerified from "../../../public/notverified.svg";
import Rate from "./Rate";
import ContextMenu from "./ContextMenu";
import { JobType } from "../../types/jobTypes";
import config from "../../../config";
import Cookies from "js-cookie";
import { IoHeartSharp } from "react-icons/io5";
import moment from "moment";

const Job: React.FC<JobType> = ({
  id,
  amount,
  clientLocation,
  clientRate,
  clientSpent,
  description,
  favourite,
  paymentVerified,
  postedAt,
  proposalsNumber,
  tags,
  title,
  type,
  ignore,
}) => {
  const token = Cookies.get("token");
  const [iSFavourite, setIsFavourite] = useState(favourite);
  const [interested, setInterested] = useState(ignore);

  async function handleFavorite() {
    const prevState = iSFavourite;
    setIsFavourite(!iSFavourite);
    try {
      if (!iSFavourite) {
        await setJobFav(id);
      } else {
        await setJobUnFav(id);
      }
    } catch (error) {
      setIsFavourite(prevState);
    }
  }
  async function setJobFav(id: number) {
    const response = await fetch(`${config.BASE_URL}/jobs/fav/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to set it as favourite");
    }
  }
  async function setJobUnFav(id: number) {
    const response = await fetch(`${config.BASE_URL}/jobs/unfav/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to set it as unfavourite");
    }
  }

  return (
    <div className="  font-urbanist shadow h-fit flex flex-col p-4 rounded-lg  cursor-pointer hover:shadow-lg hover:shadow-gray-500/50  ">
      <div className="flex items-start justify-between">
        <h2 className="font-bold   w-[75%]">{title}</h2>
        <IoHeartSharp
          className="w-4 h-4 transition-all cursor-pointer"
          onClick={handleFavorite}
          style={{
            filter: iSFavourite
              ? "invert(22%) sepia(97%) saturate(7483%) hue-rotate(355deg) brightness(95%) contrast(107%)"
              : "invert(100%)",
            border: iSFavourite ? "none" : "1px solid rgba(0, 0, 0, 0.5)",
            borderRadius: "50%",
            background: "transparent",
          }}
        />
        <ContextMenu
          interested={interested}
          setInterested={setInterested}
          id={id}
        />
      </div>

      <div className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full w-fit font-semibold my-2">
        {type}
      </div>

      <ExpandableText text={description}></ExpandableText>

      <div className="flex justify-between my-2 pr-5">
        <div className="flex items-center">
          <img
            src={clock}
            alt="clock Icon"
            className="w-5 h-5 transition-all "
          />
          <h1 className="text-xs font-semibold">
            {moment(postedAt ?? new Date()).format("MMMM D, YYYY h:mm A")}
          </h1>
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
          {paymentVerified ? (
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
          {clientLocation}
        </div>
      </div>
      <div className="flex my-2 flex-wrap">
        {tags?.split(",").map((tag, index) => {
          return (
            <div
              key={index}
              className="m-1 bg-[#f3f4f6] text-black text-xs px-2 py-0.5 rounded-full w-fit font-semibold my-2"
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Job;
