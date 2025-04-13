
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const heroImages = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background images - fade in/out based on current index */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://source.unsplash.com/random/1920x1080/?event,${index})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4 z-10">
        <img
          src="/logo.svg"
          alt="Kuskitie Logo"
          className="w-40 h-auto mb-6 animate-fade-in"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          Löydä paikalliset tapahtumat
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl mb-8 animate-fade-in">
          Löydä mielenkiintoisimmat tapahtumat alueeltasi. Verkostoidu yhteisösi kanssa ja luo unohtumattomia muistoja.
        </p>
        
        <Link to="/events">
          <Button className="bg-kuski-beige text-kuski-dark hover:bg-white text-lg py-6 px-8 animate-fade-in">
            Tutustu tapahtumiin
          </Button>
        </Link>
      </div>
      
      {/* Image indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full",
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            )}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
