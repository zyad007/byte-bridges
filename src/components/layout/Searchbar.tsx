import React, { useState } from "react";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
interface searchBarProps {
  onSearch: (query: string) => void;
}
const Searchbar: React.FC<searchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };
  return (
    <div className="w-3/6 mb-6 flex ">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Search jobs, workers, or data..."}
        startContent={<Search className="w-5 h-5 text-gray-500" />}
        className="rounded-lg "
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default Searchbar;
