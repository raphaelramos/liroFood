export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  open: boolean;
  category: string;
  address: string;
  deliveryEstimate: string;
  rating: number;
  cep: number;
  phone: number;
  imagePath: string;
  color: string;
  hours?: {
    day: number,
    open: number,
    close: number
  };
  day?: number;
  about?: string;
  modified: string;
}
