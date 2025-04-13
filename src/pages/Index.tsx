
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import { events } from '@/data/events';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const { user, hasValidSubscription, getRemainingDays } = useAuth();
  
  useEffect(() => {
    // Filter out expired events
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    });
    
    setAllEvents(upcomingEvents);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Subscription status - Moved higher */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {user && hasValidSubscription() ? (
              <div className="bg-kuski-beige p-5 rounded-lg shadow-sm border border-green-300">
                <h3 className="font-semibold text-green-700 mb-2">Aktiivinen tilaus</h3>
                <p className="text-gray-700 mb-2">
                  Sinulla on {getRemainingDays()} päivää jäljellä tilauksessasi.
                </p>
                <Link to="/events">
                  <Button className="w-full bg-kuski-dark text-white">Selaa tapahtumia</Button>
                </Link>
              </div>
            ) : (
              <div className="bg-kuski-beige p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-kuski-dark mb-2">Aloita tänään</h3>
                <p className="text-gray-700 mb-2">
                  Rekisteröidy ja tilaa palvelu nähdäksesi kaikki tapahtumat.
                </p>
                <div className="flex gap-2">
                  {user ? (
                    <Link to="/subscription" className="w-full">
                      <Button className="w-full bg-kuski-dark text-white">Tilaa nyt</Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="w-1/2">
                        <Button variant="outline" className="w-full border-kuski-dark text-kuski-dark">Kirjaudu</Button>
                      </Link>
                      <Link to="/register" className="w-1/2">
                        <Button className="w-full bg-kuski-dark text-white">Rekisteröidy</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        
        <FeaturedEvents events={allEvents} />
        
        <section className="py-16 bg-kuski-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-kuski-dark mb-4">
                  Löydä sinulle tärkeät tapahtumat
                </h2>
                <p className="text-gray-700 mb-6">
                  Kuskitie yhdistää sinut parhaiden paikallisten tapahtumien kanssa. Etsitpä sitten konsertteja, työpajoja, 
                  yhteisötapahtumia tai urheilutapahtumia, meiltä löydät ne.
                </p>
                <p className="text-gray-700 mb-6">
                  Alustamme tekee helpoksi löytää tapahtumia kiinnostustesi, sijaintisi ja aikataulusi mukaan.
                  Älä koskaan jää paitsi siitä, mitä ympärilläsi tapahtuu!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="font-semibold text-kuski-dark">300+</h3>
                    <p className="text-gray-600 text-sm">Tapahtumaa kuukaudessa</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <h3 className="font-semibold text-kuski-dark">50+</h3>
                    <p className="text-gray-600 text-sm">Sijaintia</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white p-1 shadow-lg rounded-lg transform rotate-2">
                  <img 
                    src="https://source.unsplash.com/random/600x800/?event,people" 
                    alt="Ihmisiä tapahtumassa" 
                    className="rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-1 shadow-lg rounded-lg transform -rotate-3 w-2/3">
                  <img 
                    src="https://source.unsplash.com/random/400x300/?concert" 
                    alt="Konsertti" 
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
