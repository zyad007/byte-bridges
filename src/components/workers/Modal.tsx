import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
} from "@heroui/react";
import { CheckCircle } from "lucide-react";

interface WorkerModalProps {
  isOpen: boolean;
  name: string;
  ip: string;
  status: string;
  payement: "hourly" | "fixed";
  payment_verfied: boolean;
  propsal_count: string;
  onOpenChange: () => void;
}

const priceRanges = [
  { id: "0-99", label: "0-99" },
  { id: "100-499", label: "100-499" },
  { id: "500-999", label: "500-999" },
  { id: "1000-4999", label: "1000-4999" },
  { id: "5000-", label: "5000-" },
];

const proposalsRanges = [
  { id: "0-5", label: "0-5" },
  { id: "5-10", label: "5-10" },
  { id: "10-15", label: "10-15 " },
  { id: "15-20", label: "15-20" },
  { id: "20-50", label: "20-50" },
  { id: "50-", label: "50" },
];

const WorkerModal: React.FC<WorkerModalProps> = ({
  isOpen,
  onOpenChange,
  name,
  ip,
  status,
  payement,
  payment_verfied,
  propsal_count,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [selectedPayment, setSelectedPayment] = useState(payement);
  const [isChecked, setIsChecked] = useState(payment_verfied);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedProposals, setSelectedProposals] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(status);
      setSelectedPayment(payement);
      setIsChecked(payment_verfied);

      const proposalsArray = propsal_count ? propsal_count.split(",") : [];
      setSelectedProposals(proposalsArray);

      setSelectedPriceRanges([]);
    }
  }, [isOpen, status, payement, payment_verfied, propsal_count]);

  const handleCheckboxChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="flex text-medium font-semibold my-1 flex-col">
                {name}
                <div className="text-sm text-[#6B7280]">IP: {ip}</div>
              </div>

              <div className="my-1">
                <span className="text-black font-semibold flex">Status</span>
                <RadioGroup
                  className="text-black font-semibold flex gap-2 mt-2"
                  value={selectedStatus}
                  onValueChange={setSelectedStatus as () => void}
                >
                  <div className="flex gap-2">
                    <Radio value="running">Running</Radio>
                    <Radio value="paused">Paused</Radio>
                    <Radio value="inactive">Inactive</Radio>
                  </div>
                </RadioGroup>
              </div>

              <div className="my-2">
                <span className="text-black font-semibold">Payment Type</span>
                <div className="flex gap-4 mt-2">
                  <Checkbox
                    isSelected={selectedPayment === "hourly"}
                    onValueChange={() => setSelectedPayment("hourly")}
                  >
                    Hourly
                  </Checkbox>
                  <Checkbox
                    isSelected={selectedPayment === "fixed"}
                    onValueChange={() => setSelectedPayment("fixed")}
                  >
                    Fixed
                  </Checkbox>
                </div>
              </div>

              <div className="flex items-center p-3 border border-blue-300 rounded-lg bg-blue-50">
                <Checkbox
                  isSelected={isChecked}
                  onValueChange={setIsChecked}
                  className="mr-2"
                />
                <span
                  className={`text-sm font-medium ${
                    isChecked ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  Payment Verified
                </span>
                {isChecked && (
                  <CheckCircle className="w-4 h-4 text-blue-600 ml-1" />
                )}
              </div>

              <div className="my-1">
                <span className="text-black font-semibold">Cost Range</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {priceRanges.map((range) => (
                    <Checkbox
                      key={range.id}
                      isSelected={selectedPriceRanges.includes(range.id)}
                      onValueChange={() =>
                        handleCheckboxChange(range.id, setSelectedPriceRanges)
                      }
                    >
                      {range.label}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className="my-1">
                <span className="text-black font-semibold">
                  Number of Proposals
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {proposalsRanges.map((option) => (
                    <Checkbox
                      key={option.id}
                      isSelected={selectedProposals.includes(option.id)}
                      onValueChange={() =>
                        handleCheckboxChange(option.id, setSelectedProposals)
                      }
                    >
                      {option.label}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => console.log(selectedProposals)}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WorkerModal;
