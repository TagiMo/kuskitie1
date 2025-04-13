
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import EventCard from './EventCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // Get upcoming events, prioritize high taksipotentiaali, and sort by date
    const upcoming = [...events]
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => {
        // First sort by taksipotentiaali (descending)
        if (b.taksipotentiaali !== a.taksipotentiaali) {
          return b.taksipotentiaali - a.taksipotentiaali;
        }
        // Then sort by date (ascending)
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    
    // Take the first 3 events as featured
    setFeaturedEvents(upcoming.slice(0, 3));
  }, [events]);

  if (featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-kuski-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-kuski-dark mb-4">
            Nostotapahtumat
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Tutustu näihin tuleviin tapahtumiin Turun, Kaarinan ja Raision alueilla. Korkean taksipotentiaalin tapahtumat!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/events">
            <Button variant="outline" className="text-kuski-dark border-kuski-dark hover:bg-white">
              Näytä kaikki tapahtumat
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
