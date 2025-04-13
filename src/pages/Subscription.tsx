
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Mock subscription plans
const subscriptionPlans = [
  {
    id: 'monthly',
    name: 'Kuukausi',
    price: '19,90',
    durationMonths: 1,
    features: [
      'Pääsy kaikkiin tapahtumiin',
      'Taksipotentiaali-arviot',
      'Karttanäkymä',
      'Suodatusmahdollisuudet',
    ],
    cta: 'Valitse kuukausitilaus',
  },
  {
    id: 'bimonthly',
    name: '2 Kuukautta',
    price: '34,90',
    discountPercent: 12,
    durationMonths: 2,
    features: [
      'Pääsy kaikkiin tapahtumiin',
      'Taksipotentiaali-arviot',
      'Karttanäkymä',
      'Suodatusmahdollisuudet',
      'Alennus kuukausihinnasta',
    ],
    cta: 'Valitse 2 kuukauden tilaus',
    recommended: true,
  },
  {
    id: 'quarterly',
    name: '3 Kuukautta',
    price: '49,90',
    discountPercent: 16,
    durationMonths: 3,
    features: [
      'Pääsy kaikkiin tapahtumiin',
      'Taksipotentiaali-arviot',
      'Karttanäkymä',
      'Suodatusmahdollisuudet',
      'Suurin alennus kuukausihinnasta',
      'Ennakoiva ilmoitus tapahtumista',
    ],
    cta: 'Valitse 3 kuukauden tilaus',
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast({
        title: "Valitse tilaus",
        description: "Valitse ensin tilaussuunnitelma",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Tilaus onnistui",
      description: "Kiitos tilauksestasi! Olet nyt premium-jäsen.",
    });
    
    setLoading(false);
    navigate('/events');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-kuski-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-kuski-dark mb-4">
              Valitse sopiva tilaus
            </h1>
            {user ? (
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sinulla on {user.subscriptionTier !== 'free' ? 'premium' : 'ilmainen'} tilaus.
                {user.subscriptionTier !== 'free' && 
                  ` Tilauksesi on voimassa vielä ${new Date(user.subscriptionEnd).toLocaleDateString('fi-FI')} asti.`}
              </p>
            ) : (
              <p className="text-gray-600 max-w-2xl mx-auto">
                Valitse sinulle sopivin tilausvaihtoehto saadaksesi pääsyn kaikkiin tapahtumiin 
                ja ominaisuuksiin.
              </p>
            )}
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all 
                  ${selectedPlan === plan.id ? 'ring-2 ring-kuski-dark transform scale-[1.02]' : ''}
                  ${plan.recommended ? 'md:transform md:scale-105' : ''}`}
              >
                {plan.recommended && (
                  <div className="bg-kuski-dark text-white py-1 text-center text-sm font-medium">
                    Suosituin valinta
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-kuski-dark">{plan.name}</h3>
                  
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-extrabold text-kuski-dark">{plan.price}€</span>
                    <span className="ml-1 text-gray-500">/ {plan.durationMonths} kk</span>
                  </div>
                  
                  {plan.discountPercent && (
                    <div className="mt-1 inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      Säästä {plan.discountPercent}%
                    </div>
                  )}
                  
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`mt-8 w-full ${plan.recommended ? 'bg-kuski-dark hover:bg-kuski-dark/90' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {selectedPlan && (
            <div className="mt-12 flex justify-center">
              <Button
                size="lg"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? 'Käsitellään...' : 'Jatka tilaukseen'}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Subscription;
