
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, ClockIcon, UserIcon, ArrowLeft, StarIcon, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import { Event } from '@/types/event';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { events as allEvents } from '@/data/events';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call, in a real app this would be a fetch
    const fetchEvent = () => {
      setLoading(true);
      const foundEvent = allEvents.find(e => e.id === id);
      setEvent(foundEvent || null);
      setLoading(false);
    };
    
    fetchEvent();
  }, [id]);

  // Generate star rating display based on taksipotentiaali
  const renderTaksipotentiaali = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };
  
  // Function to create an OpenStreetMap URL
  const getOpenStreetMapUrl = (location: string, city: string) => {
    const encodedLocation = encodeURIComponent(`${location}, ${city}, Finland`);
    return `https://www.openstreetmap.org/search?query=${encodedLocation}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kuski-dark mx-auto"></div>
            <p className="mt-4 text-gray-600">Ladataan tapahtumaa...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-kuski-dark mb-4">Tapahtumaa ei löytynyt</h2>
            <p className="text-gray-600 mb-6">Valitettavasti hakemaasi tapahtumaa ei löytynyt.</p>
            <Link to="/events">
              <Button>Takaisin tapahtumiin</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <Link to="/events" className="inline-flex items-center text-kuski-dark hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Takaisin tapahtumiin
          </Link>
          
          <div className="bg-kuski-beige rounded-lg shadow-md overflow-hidden">
            {/* Event title and details */}
            <div className="p-6 no-select">
              <h1 className="text-2xl sm:text-3xl font-bold text-kuski-dark mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-y-4 gap-x-8 mb-6">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{format(new Date(event.date), 'PPP', { locale: fi })}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <UserIcon className="h-5 w-5 mr-2" />
                  <span>{event.organizer}</span>
                </div>
              </div>
              
              {/* Taksipotentiaali */}
              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">Taksipotentiaali:</p>
                <div className="flex">
                  {renderTaksipotentiaali(event.taksipotentiaali)}
                </div>
              </div>
              
              {/* Event description */}
              <div className="mb-8">
                <p className="text-gray-700 font-medium mb-2">Kuvaus:</p>
                <p className="text-gray-600">{event.description}</p>
              </div>
              
              {/* OpenStreetMap link */}
              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">Sijainti kartalla:</p>
                <a 
                  href={getOpenStreetMapUrl(event.location, event.city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kuski-dark hover:underline flex items-center"
                >
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  Näytä sijainti OpenStreetMap-palvelussa
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
