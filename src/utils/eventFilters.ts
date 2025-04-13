
import { Event } from '@/types/event';
import { isEventInDateRange, getEventEndDateTime } from './dateUtils';

/**
 * Filter events based on search term, city, date, and date range
 */
export const filterEvents = (
  events: Event[],
  searchTerm: string,
  city: string,
  date: Date | undefined,
  dateRange: 'day' | 'week' | 'month'
): Event[] => {
  // Get current date and time
  const now = new Date();
  
  // Filter events based on current filter values and remove expired events
  return events.filter(event => {
    // Check if event has passed (using endTime if available, otherwise date + time)
    const eventEndDateTime = getEventEndDateTime(event.date, event.endTime, event.time);
    const eventHasPassed = eventEndDateTime < now;
    
    if (eventHasPassed) {
      return false; // Skip expired events
    }
    
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = city ? event.city === city : true;
    
    let matchesDate = true;
    if (date) {
      const eventDate = new Date(event.date);
      matchesDate = isEventInDateRange(eventDate, date, dateRange);
    }
    
    return matchesSearch && matchesCity && matchesDate;
  });
};

/**
 * Extract unique cities from events
 */
export const extractUniqueCities = (events: Event[]): string[] => {
  const cities = Array.from(new Set(events.map(event => event.city)));
  return cities.sort(); // Sort alphabetically so we have consistent order
};
