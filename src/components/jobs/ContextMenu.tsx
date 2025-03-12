"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { MoreVertical } from "lucide-react";
import config from "../../../config";
import Cookies from "js-cookie";

interface interestedProps {
  interested: boolean;
  setInterested: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const ContextMenu: React.FC<interestedProps> = ({
  interested,
  setInterested,
  id,
}) => {
  const token = Cookies.get("token");
  async function handleInterested() {
    setInterested((prev: boolean) => !prev);
    const prevState = interested;
    setInterested(!interested);
    try {
      if (!interested) {
        console.log(
          "ana fe el not handle we ha call setJobInTERES",
          interested
        );
        await setJobinterested(id);
      } else {
        console.log("ana fe el handle we ha call setJobInTERES", interested);

        await setJobUnInterested(id);
      }
    } catch (error) {
      setInterested(prevState);
      console.error("Error updating interest status:", error);
    }
  }

  async function setJobinterested(id: number) {
    const response = await fetch(`${config.BASE_URL}/jobs/interested/${id}`, {
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
  async function setJobUnInterested(id: number) {
    const response = await fetch(
      `${config.BASE_URL}/jobs/not-interested/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to set it as unfavourite");
    }
    console.log("hi");
  }

  return (
    <Dropdown className="items-start ">
      <DropdownTrigger className="items-start ">
        <Button
          isIconOnly
          variant="light"
          className="bg-transparent shadow-none p-0 m-0 w-auto h-auto min-w-0 min-h-0"
        >
          <MoreVertical size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem key="edit" onPress={handleInterested}>
          {interested ? "Not Interested" : "Interested"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default ContextMenu;
