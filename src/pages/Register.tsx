
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // If user is already logged in, redirect to events page
  if (user) {
    return <Navigate to="/events" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Virhe",
        description: "Täytä kaikki kentät",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Virhe",
        description: "Salasanat eivät täsmää",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await register(email, password, name);
      
      if (success) {
        toast({
          title: "Rekisteröityminen onnistui",
          description: "Tervetuloa käyttämään Kuskitietä!",
        });
        navigate('/events');
      } else {
        toast({
          title: "Rekisteröityminen epäonnistui",
          description: "Sähköposti on jo käytössä",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Virhe",
        description: "Rekisteröityminen epäonnistui",
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
              Rekisteröidy
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nimi
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-kuski-dark focus:border-kuski-dark"
                  placeholder="Matti Meikäläinen"
                  required
                />
              </div>
              
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Vahvista salasana
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Rekisteröidytään...' : 'Rekisteröidy'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Onko sinulla jo tili?{' '}
                <Link to="/login" className="text-kuski-dark font-medium hover:underline">
                  Kirjaudu sisään
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
