export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Location {
  lat: number;
  lng: number;
}