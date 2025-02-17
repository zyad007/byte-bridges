"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { MoreVertical } from "lucide-react";

export default function ContextMenu() {
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
        <DropdownItem key="edit">Not Interested</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
