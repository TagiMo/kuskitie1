
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  category: string;
  taksipotentiaali: number;
  image?: string; // Making image optional with the question mark
  city: string;
  endTime?: string; // Optional end time for events
}
