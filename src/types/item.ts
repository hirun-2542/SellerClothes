export type SizeEntry = {
  label: string;
  chest: string;
  length: string;
};

export type ClothingItem = {
  id: string;
  brand: string;
  name: string;
  color: string;
  conditionLevel: string;
  flawNote: string;
  sizes: SizeEntry[];
  price: number;
};
