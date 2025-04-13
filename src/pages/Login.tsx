
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // If user is already logged in, redirect to events page
  if (user) {
    return <Navigate to="/events" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Virhe",
        description: "Täytä kaikki kentät",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Kirjautuminen onnistui",
          description: "Tervetuloa takaisin!",
        });
        navigate('/events');
      } else {
        toast({
          title: "Kirjautuminen epäonnistui",
          description: "Tarkista sähköposti ja salasana",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Virhe",
        description: "Kirjautuminen epäonnistui",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center bg-kuski-beige py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-kuski-dark mb-6 text-center">
              Kirjaudu sisään
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Sähköposti
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kuski-dark focus:border-kuski-dark"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Salasana
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kuski-dark focus:border-kuski-dark"
                  placeholder="********"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Etkö ole vielä rekisteröitynyt?{' '}
                <Link to="/register" className="text-kuski-dark font-medium hover:underline">
                  Rekisteröidy tästä
                </Link>
              </p>
            </div>

            {/* Test account info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm">
              <p className="font-medium mb-2">Testitunnukset:</p>
              <ul className="space-y-1 text-gray-600">
                <li>Email: test@example.com</li>
                <li>Salasana: password</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
