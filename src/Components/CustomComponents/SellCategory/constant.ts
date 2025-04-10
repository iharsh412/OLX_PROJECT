
export interface SellCategoryProps {
    categoryId: string;
}

export const SUBCATEGORIES: Record<string, string[]> = {
    cars: ['Cars'],
    mobile: ['Mobile', 'Tablet'],
    electronics: ['Computer', 'TVs', 'Camera'],
    bikes: ['Bikes', 'Scooters'],
};

export  const CLASSNAME ={
       WRAPPER:"sell-category",
       OPTIONS:"sell-category__option"

}

export const OPTIONS = {
    TITLE:'Select this category',
    TYPE:"button",

}