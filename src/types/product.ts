export interface Product {
     id: number;
     title: string;
     slug: string;
     price: number;
     description: string;
     category: {
         id: number;
         name: string;
         slug: string;
         image: string;
     };
     images: string[];
 }

export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}