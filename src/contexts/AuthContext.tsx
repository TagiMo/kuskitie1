
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

// Mock users for testing
const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password',
    name: 'Test User',
    subscriptionTier: 'basic',
    subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  },
  {
    id: '2',
    email: 'premium@example.com',
    password: 'password',
    name: 'Premium User',
    subscriptionTier: 'premium',
    subscriptionEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
  },
];

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  hasValidSubscription: () => boolean;
  getRemainingDays: () => number;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      
      // Check if subscription is valid
      if (new Date(parsedUser.subscriptionEnd) > new Date()) {
        setUser(parsedUser);
      } else {
        // Subscription expired, log out
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate registration
    const userExists = mockUsers.some(u => u.email === email);
    
    if (userExists) {
      return false;
    }
    
    // Create new user with free tier (no actual persistence in this mock)
    const newUser = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
      subscriptionTier: 'free' as const,
      subscriptionEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7-day trial
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const hasValidSubscription = (): boolean => {
    if (!user) return false;
    
    const now = new Date();
    const subscriptionEndDate = new Date(user.subscriptionEnd);
    
    return subscriptionEndDate > now;
  };

  const getRemainingDays = (): number => {
    if (!user) return 0;
    
    const now = new Date();
    const subscriptionEndDate = new Date(user.subscriptionEnd);
    
    const diffTime = subscriptionEndDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        register, 
        hasValidSubscription, 
        getRemainingDays
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
