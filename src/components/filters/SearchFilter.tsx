
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchFilter = ({ searchTerm, setSearchTerm }: SearchFilterProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Etsi tapahtumia..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="filter-input pl-10 w-full"
      />
    </div>
  );
};

export default SearchFilter;
