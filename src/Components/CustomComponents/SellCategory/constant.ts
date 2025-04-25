export interface SellCategoryProps {
  categoryId: string;
}

export const SUBCATEGORIES: Record<string, string[]> = {
//   multiWheelVehicles: ['Cars', 'Trucks', 'Buses'],
  mobile: ['Mobile', 'Tablet', ],
  electronics: ['Computer', 'TVs', 'Camera'],
  bikes: ['Bikes', 'Scooters'],
};

export const CLASSNAME = {
  WRAPPER: 'sell-category',
  OPTIONS: 'sell-category__option',
};

export const TEXT = {
  TITLE: 'Select this category',
};
