export interface Booking {
  id: string;
  created_at: string;
  client_name: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  care_complexity: string;
  package_selected: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'closed';
  notes: string;
}
