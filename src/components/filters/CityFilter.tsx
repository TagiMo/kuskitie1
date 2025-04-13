
import { MapPin } from 'lucide-react';

interface CityFilterProps {
  city: string;
  setCity: (value: string) => void;
  cities: string[];
}

const CityFilter = ({ city, setCity, cities }: CityFilterProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="filter-input pl-10 w-full appearance-none"
      >
        <option value="">Kaikki kaupungit</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityFilter;
