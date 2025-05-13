export interface Tesoro {
  id: string;
  name: string;
  condition: string;
  origin: string?;
  brand: string?;
  material: string?;
  type: string?;
  large: number?;
  width: number?;
  height: number?;
  diameter: number?;
  units: number;
  price: number;
  images: string[];
}
