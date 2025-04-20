export interface ProductEntity {
  id: number;
  name: string;
  description: string;
  category: "SWEET" | "SNACK" | "REFRESHMENT";
}

export interface NewProductEntity {
  name: string;
  description: string;
  category: "SWEET" | "SNACK" | "REFRESHMENT";
}
