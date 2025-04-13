
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/event';
import { filterEvents, extractUniqueCities } from '@/utils/eventFilters';
import SearchFilter from './filters/SearchFilter';
import CityFilter from './filters/CityFilter';
import DateFilter from './filters/DateFilter';

interface EventFiltersProps {
  events: Event[];
  onFilterChange: (filtered: Event[]) => void;
}

const EventFilters = ({ events, onFilterChange }: EventFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [cities, setCities] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    // Extract unique cities from events
    const uniqueCities = extractUniqueCities(events);
    setCities(uniqueCities);
  }, [events]);

  useEffect(() => {
    // Filter events based on current filter values
    const filteredEvents = filterEvents(events, searchTerm, city, date, dateRange);
    onFilterChange(filteredEvents);
  }, [searchTerm, city, date, dateRange, events, onFilterChange]);

  const resetFilters = () => {
    setSearchTerm('');
    setCity('');
    setDate(undefined);
    setDateRange('day');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-xl font-semibold text-kuski-dark mb-4">Suodata tapahtumia</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search by keyword */}
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Filter by city */}
        <CityFilter city={city} setCity={setCity} cities={cities} />
        
        {/* Filter by date with date range options */}
        <DateFilter 
          date={date} 
          setDate={setDate} 
          dateRange={dateRange} 
          setDateRange={setDateRange} 
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="text-sm"
        >
          Nollaa suodattimet
        </Button>
      </div>
    </div>
  );
};

export default EventFilters;
