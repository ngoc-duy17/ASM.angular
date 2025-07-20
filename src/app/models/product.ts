export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock?: boolean; // nếu có field này từ server
}
