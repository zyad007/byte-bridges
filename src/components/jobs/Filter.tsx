import filter from "../../../public/filter.svg";
import { useState } from "react";
import { Input, Slider } from "@heroui/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Checkbox,
  Button,
} from "@heroui/react";
const costRange = ["0-99", "100-499", "500-999", "1000-4999", "5000-"];
const numberOfProposals = ["0-5", "5-10", "10-15", "15-20", "20-50", "50-"];

export default function Filter() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [clientSpent, setClientSpent] = useState({ min: "", max: "" });
  const [value, setValue] = useState([1, 3]);

  const handleCheckboxChange = (filter: string, checked: boolean) => {
    setSelectedFilters((prev) =>
      checked ? [...prev, filter] : prev.filter((item) => item !== filter)
    );
  };
  const handleClientSpentChange = (type: "min" | "max", value: string) => {
    setClientSpent((prev) => ({ ...prev, [type]: value }));
  };
  const applyFilters = () => {
    console.log("Selected Filters:", selectedFilters);
    setOpen(false);
  };

  return (
    <Popover placement="bottom" showArrow isOpen={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="bordered"
          className="bg-transparent shadow-none mx-2 w-fit min-w-0 px-4 "
          onPress={() => setOpen(true)}
        >
          <img src={filter} alt="fav Icon" className="w-4 h-4 transition-all" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" flex p-4 w-auto justify-start items-start ">
        <div className="flex flex-col justify-start items-start">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium my-2">Number of proposals</h3>
              <div className="flex flex-col">
                {numberOfProposals.map((filter, index) => (
                  <Checkbox
                    className="mx-0.5"
                    key={index}
                    isSelected={selectedFilters.includes(filter)}
                    onValueChange={(checked) =>
                      handleCheckboxChange(filter, checked)
                    }
                  >
                    {filter}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-medium my-2">Cost Range</h3>
              <div className="flex flex-col">
                {costRange.map((filter, index) => (
                  <Checkbox
                    className="mx-0.5"
                    key={index}
                    isSelected={selectedFilters.includes(filter)}
                    onValueChange={(checked) =>
                      handleCheckboxChange(filter, checked)
                    }
                  >
                    {filter}
                  </Checkbox>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start mb-2">
          <h3 className="text-sm font-medium my-2">Payment Type</h3>
          <div className="flex">
            <Checkbox
              className="mx-0.5"
              isSelected={selectedFilters.includes(filter)}
              onValueChange={(checked) => handleCheckboxChange(filter, checked)}
            >
              Hourly
            </Checkbox>
            <Checkbox
              className="mx-0.5"
              isSelected={selectedFilters.includes(filter)}
              onValueChange={(checked) => handleCheckboxChange(filter, checked)}
            >
              Fixed
            </Checkbox>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
          <Slider
            className="max-w-md"
            label="Client Rate"
            maxValue={5}
            minValue={0}
            step={0.01}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="my-2">
          <span className="text-black font-semibold">
            Client Spent Range ($)
          </span>
          <div className="flex gap-4 mt-2">
            <Input
              type="text"
              placeholder="Min"
              value={clientSpent.min}
              onChange={(e) => handleClientSpentChange("min", e.target.value)}
              className="w-1/2"
            />
            <Input
              type="text"
              placeholder="Max"
              value={clientSpent.max}
              onChange={(e) => handleClientSpentChange("max", e.target.value)}
              className="w-1/2"
            />
          </div>
        </div>
        <div className="flex justify-end items-end">
          <Button onPress={applyFilters} className="w-auto mt-3">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
