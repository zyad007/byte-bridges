import React, { useCallback, useEffect, useState } from "react";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
interface searchBarProps {
  query: string;
  setQuery: (query: string) => void;
}
const Searchbar: React.FC<searchBarProps> = ({ query, setQuery }) => {
  const [input, setInput] = useState<string>(query);
  const handleSearch = useCallback(() => {
    const handler = setTimeout(() => {
      if (input?.trim()) {
        setQuery(input);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [query, input, setQuery]);
  useEffect(() => {
    handleSearch();
  }, [input]);
  return (
    <div className=" font-urbanist w-3/6 mb-6 flex ">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Search jobs, workers, or data..."}
        startContent={<Search className="w-5 h-5 text-gray-500" />}
        className="rounded-lg "
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default Searchbar;
