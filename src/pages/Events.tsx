
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import EventFilters from '@/components/EventFilters';
import { events } from '@/data/events';
import { Event } from '@/types/event';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Events = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Get current date and time
    const now = new Date();
    
    // Filter out expired events
    const activeEvents = events.filter(event => {
      // Parse the event end date and time
      const [year, month, day] = event.date.split('-').map(Number);
      let endHour = 23, endMinute = 59;
      
      if (event.endTime) {
        // If endTime is specified, use it
        [endHour, endMinute] = event.endTime.split(':').map(Number);
      } else if (event.time.includes('-')) {
        // If time has a range format like "10:00-12:00"
        const endTimeStr = event.time.split('-')[1].trim();
        [endHour, endMinute] = endTimeStr.split(':').map(Number);
      } else {
        // Default: use the event time and add 2 hours
        const [startHour, startMinute] = event.time.split(':').map(Number);
        endHour = startHour + 2;
        endMinute = startMinute;
      }
      
      const eventEndDateTime = new Date(year, month - 1, day, endHour, endMinute);
      
      // Return true if event has not passed yet
      return eventEndDateTime >= now;
    });
    
    // Set the filtered events
    setAllEvents(activeEvents);
    setFilteredEvents(activeEvents);
  }, []);

  const handleFilterChange = (filtered: Event[]) => {
    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-white">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-kuski-dark mb-4">
                Selaa tapahtumia
              </h1>
              <p className="max-w-2xl mx-auto text-gray-600">
                Selaa ja suodata tulevia tapahtumia alueellasi. 
                Löydä kiinnostuksiisi ja aikatauluusi sopiva tapahtuma.
              </p>
            </div>

            <EventFilters events={allEvents} onFilterChange={handleFilterChange} />

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-kuski-beige rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-kuski-dark mb-2">Tapahtumia ei löytynyt</h3>
                <p className="text-gray-600 mb-4">Kokeile muuttaa hakuehtoja löytääksesi tapahtumia</p>
              </div>
            )}
            
            <div className="text-center mt-10">
              <Link 
                to="https://www.kuskitie.com/otayhteytta" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-kuski-dark hover:underline"
              >
                Ota yhteyttä <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
