export interface FoodListModel {
  categories: CategoryElement[];
}

export interface CategoryElement {
  category: Category;
}

export interface Category {
  subcategories: Subcategory[];
  quote: string;
  protip: string;
  imagePath: string;
  localImagePath: string;
  categoryName: string;
  colorCode: string;
  servingSize?: string;
}

export interface Subcategory {
  items: string[];
  subCategoryname: string;
  servingSize?: string;
}
