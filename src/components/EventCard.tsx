
import { CalendarIcon, MapPinIcon, StarIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '@/types/event';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  // Generate star rating display based on taksipotentiaali
  const renderTaksipotentiaali = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`h-4 w-4 ${i < event.taksipotentiaali ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  // Function to get a map link based on the location
  const getMapLink = (location: string, city: string) => {
    const encodedLocation = encodeURIComponent(`${location}, ${city}, Finland`);
    return `https://www.openstreetmap.org/search?query=${encodedLocation}`;
  };

  return (
    <Link to={`/events/${event.id}`} className="event-card block">
      <div className="p-4 no-select">
        <h3 className="text-lg font-semibold text-kuski-dark">{event.title}</h3>
        
        <div className="flex items-center mt-2 text-gray-600">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{format(new Date(event.date), 'PPP', { locale: fi })}</span>
        </div>
        
        <div className="flex items-center mt-1 text-gray-600">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{event.location}</span>
          <a 
            href={getMapLink(event.location, event.city)} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 text-kuski-dark hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        
        <div className="flex items-center mt-2">
          <span className="text-sm mr-2">Taksipotentiaali:</span>
          <div className="flex">
            {renderTaksipotentiaali()}
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {event.description}
        </p>
        
        <div className="mt-4 text-kuski-dark font-medium text-sm">
          Näytä lisätiedot →
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
