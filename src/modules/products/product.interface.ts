export interface IProduct {
  title: string;
  description?: string;
  price: number;
  discountPrice?: number| null;
  sku?: string;
  stock?: number;
  images: string[];
  categoryId?: string;  
}