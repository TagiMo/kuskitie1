
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="block h-10 w-auto"
                src="/lovable-uploads/e7a82a6c-fa38-4861-8298-2c1cd95c9bf9.png"
                alt="Kuskitie Logo"
              />
              <span className="ml-3 text-xl font-bold text-kuski-dark">Kuskitie</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex md:space-x-8 md:items-center">
            <Link to="/" className="text-gray-600 hover:text-kuski-dark px-3 py-2 text-sm font-medium">
              Etusivu
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-kuski-dark px-3 py-2 text-sm font-medium">
              Tapahtumat
            </Link>
            <a 
              href="https://www.kuskitie.com/otayhteytta" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-kuski-dark px-3 py-2 text-sm font-medium"
            >
              Ota yhteyttä
            </a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Hei, {user.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Kirjaudu ulos
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Kirjaudu</Button>
                </Link>
                <Link to="/register">
                  <Button>Rekisteröidy</Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Avaa päävalikko</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on state */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-kuski-dark hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Etusivu
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-kuski-dark hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tapahtumat
            </Link>
            <a 
              href="https://www.kuskitie.com/otayhteytta" 
              target="_blank"
              rel="noopener noreferrer" 
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-kuski-dark hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ota yhteyttä
            </a>
            
            {user ? (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-600">
                  Hei, {user.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-kuski-dark hover:bg-gray-50"
                >
                  Kirjaudu ulos
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-kuski-dark hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kirjaudu
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-kuski-dark hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rekisteröidy
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
