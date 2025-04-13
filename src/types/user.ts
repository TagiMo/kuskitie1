
export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'basic' | 'premium';
  subscriptionEnd: string; // ISO date string
}
