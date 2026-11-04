export enum Category {
  All = 'All Jewellery',
  Necklaces = 'Necklaces',
  Rings = 'Rings',
  Earrings = 'Earrings',
  Bangles = 'Bangles',
}

export enum SortOption {
  Featured = 'featured',
  PriceAsc = 'price-asc',
  PriceDesc = 'price-desc',
  WeightDesc = 'weight-desc',
}

export type MetalPurity =
  | '22K (916) Gold'
  | '18K (750) Gold'
  | '18K Rose Gold'
  | 'Platinum & Silver';

export interface JewelleryProduct {
  id: string;
  sku: string;
  name: string;
  category: Exclude<Category, Category.All>;
  metal: MetalPurity;
  netWeightGrams: number;
  gemstone?: string;
  price: number;
  image: string;
  imageAlt: string;
  availability: 'Ready in Showroom' | 'Crafted to Order (7 Days)';
  craftNote: string;
  description: string;
  optionLabel: string;
  options: string[];
  specifications: {
    netWeight: string;
    stoneDetail: string;
    hallmark: string;
    craftsmanship: string;
  };
}

export interface BagItem {
  product: JewelleryProduct;
  selectedOption: string;
  quantity: number;
}
