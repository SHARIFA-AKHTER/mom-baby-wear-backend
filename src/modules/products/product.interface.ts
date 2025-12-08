export interface IProduct {
  title: string;
  description?: string;
  price: number;
  sku?: string;
  stock?: number;
  images: string[];
  categoryId?: string;  
}