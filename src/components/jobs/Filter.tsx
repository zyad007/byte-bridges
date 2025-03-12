import filter from "../../../public/filter.svg";
import { useEffect, useState } from "react";
import {
  Input,
  Slider,
  Select,
  SelectItem,
  SharedSelection,
} from "@heroui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Checkbox,
  Button,
} from "@heroui/react";
import Cookies from "js-cookie";
import config from "../../../config";
import { WorkerType } from "../../types/workerTypes";
import Filters, {
  clientRatingRangeType,
  ClientSpentRangeType,
  CostRangeType,
  ProposalsType,
} from "../../types/filterTypes";
interface filterProps {
  selectedFilters: Filters;
  setSelectedFilters: (selectedFilters: Filters) => void;
}

const costRanges = ["0-99", "100-499", "500-999", "1000-4999", "5000-"];
const ProposalsNumber = ["0-5", "5-10", "10-15", "15-20", "20-50", "50-"];

const Filter: React.FC<filterProps> = ({
  setSelectedFilters,
  selectedFilters,
}) => {
  const [numberOfProposals, setNumberOfProposals] = useState<ProposalsType[]>(
    []
  );
  const [costRange, setCostRange] = useState<CostRangeType[]>([]);
  const [open, setOpen] = useState(false);
  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [isHourly, setIsHourly] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [verifiedOnly, setisverifiedOnly] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<Set<string | number>>(
    new Set()
  );

  const [clientSpentRange, setClientSpentRange] =
    useState<ClientSpentRangeType>({
      min: 0,
      max: 20000,
    });

  const [clientRatingRange, setClientRatingRange] =
    useState<clientRatingRangeType>({
      min: 2,
      max: 4,
    });
  function handleNumberOfProposals(value: ProposalsType) {
    if (!numberOfProposals.includes(value)) {
      setNumberOfProposals((prev) => [...prev, value]);
    } else numberOfProposals.filter((item) => item !== value);
  }
  function handleCostRange(value: CostRangeType) {
    if (!costRange.includes(value)) {
      setCostRange((prev) => [...prev, value]);
    } else {
      costRange.filter((item) => {
        item !== value;
      });
    }
  }
  function handleSetIsHourly() {
    setIsHourly(!isHourly);
  }
  function handleSetIsFixed() {
    setIsFixed(!isFixed);
  }
  function handleVerified() {
    setisverifiedOnly(!verifiedOnly);
  }
  const handleClientSpentRange = (type: "min" | "max", value: string) => {
    if (!isNaN(Number(value))) {
      setClientSpentRange((prev) => ({
        ...prev,
        [type]: Number(value),
      }));
    }
  };
  const handleClientRatingRange = (newValue: number[]) => {
    setClientRatingRange({
      min: newValue[0],
      max: newValue[1],
    });
  };

  const handleSelectedWorkers = (keys: Set<string | number>) => {
    setSelectedWorkers(keys);
  };
  async function queryAllWokrers() {
    const token = Cookies.get("token");
    const res = await fetch(config.BASE_URL + `/workers?search=`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const workers: WorkerType[] = await res.json();
    setWorkers(workers);
  }
  useEffect(() => {
    queryAllWokrers();
  }, []);

  const applyFilters = () => {
    const body = {
      priceRanges: costRange,
      proposalsRanges: numberOfProposals,
      clientSpentRange: clientSpentRange,
      clientRatingRange: clientRatingRange,
      isHourly: isHourly,
      isFixedPrice: isFixed,
      verifiedOnly: verifiedOnly,
      workerId: Array.from(selectedWorkers),
    };

    setSelectedFilters(body);
  };
  useEffect(() => {}, [
    numberOfProposals,
    costRange,
    isFixed,
    isHourly,
    verifiedOnly,
    clientSpentRange,
    selectedWorkers,
    selectedFilters,
  ]);
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
      <PopoverContent className=" font-urbanist flex p-4 w-auto justify-start items-start ">
        <div className="flex flex-col justify-start items-start">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium my-2 ">Number of proposals</h3>
              <div className="flex flex-col">
                {ProposalsNumber.map((filter, index) => (
                  <Checkbox
                    className="mx-0.5"
                    key={index}
                    isSelected={numberOfProposals.includes(
                      filter as ProposalsType
                    )}
                    onValueChange={() =>
                      handleNumberOfProposals(filter as ProposalsType)
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
                {costRanges.map((filter, index) => (
                  <Checkbox
                    className="mx-0.5"
                    key={index}
                    isSelected={costRange.includes(filter as CostRangeType)}
                    onValueChange={() =>
                      handleCostRange(filter as CostRangeType)
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
              onValueChange={() => {
                handleSetIsHourly();
              }}
            >
              Hourly
            </Checkbox>
            <Checkbox
              className="mx-0.5"
              onValueChange={() => {
                handleSetIsFixed();
              }}
            >
              Fixed
            </Checkbox>
          </div>
        </div>
        <Checkbox
          className="m-2 border-2 border-blue-500 bg-blue-100 w-full rounded-lg text-blue-700 hover:bg-blue-200 transition-all duration-300 flex items-center gap-2 p-2"
          onValueChange={handleVerified}
        >
          <span className=" font-urbanist text-sm font-medium text-blue-700">
            {" "}
            Payment Verified
          </span>
        </Checkbox>

        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
          <Slider
            className="max-w-md"
            label="Client Rate"
            maxValue={5}
            minValue={0}
            step={0.01}
            value={[clientRatingRange.min, clientRatingRange.max]}
            onChange={
              handleClientRatingRange as (value: number[] | number) => void
            }
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
              value={clientSpentRange.min + ""}
              onChange={(e) => handleClientSpentRange("min", e.target.value)}
              className="w-1/2"
            />
            <Input
              type="text"
              placeholder="Max"
              value={clientSpentRange.max + ""}
              onChange={(e) => handleClientSpentRange("max", e.target.value)}
              className="w-1/2"
            />
          </div>
        </div>
        <Select
          label="Assigned to"
          placeholder="Select workerd"
          variant="bordered"
          selectionMode="multiple"
          selectedKeys={selectedWorkers}
          onSelectionChange={
            handleSelectedWorkers as (keys: SharedSelection) => void
          }
          className="max-w-xs"
        >
          {workers.map((worker) => (
            <SelectItem key={worker.id} textValue={worker.name || worker.query}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">
                    {worker.name || worker.query}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>
        <div className="flex justify-end items-end">
          <Button className="w-auto mt-3" onPress={applyFilters}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default Filter;
