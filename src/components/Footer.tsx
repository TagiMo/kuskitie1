
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start">
            <img 
              src="/lovable-uploads/e7a82a6c-fa38-4861-8298-2c1cd95c9bf9.png"
              alt="Kuskitie Logo" 
              className="h-20 w-auto mb-4" 
            />
            <p className="text-gray-600 text-sm">
              Oppaasi paikallisiin tapahtumiin. Löydä, yhdisty ja osallistu yhteisösi kanssa.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-kuski-dark uppercase tracking-wider mb-2">
              Navigointi
            </h3>
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className="text-gray-600 hover:text-kuski-dark text-sm">
                Etusivu
              </NavLink>
              <NavLink to="/events" className="text-gray-600 hover:text-kuski-dark text-sm">
                Tapahtumat
              </NavLink>
              <a 
                href="https://www.kuskitie.com/otayhteytta" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-kuski-dark text-sm"
              >
                Ota yhteyttä
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Kuskitie Tapahtumat. Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
