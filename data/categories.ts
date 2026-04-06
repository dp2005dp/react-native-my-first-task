export type CategoryOption = {
  id: string;
  name: string;
  isSelected: boolean;
};

export const categories: CategoryOption[] = [
  {
    id: "1",
    name: "clothes",
    isSelected: false
  },
  {
    id: "2",
    name: "Electronics",
    isSelected: false
  },
  {
    id: "3",
    name: "Appliances",
    isSelected: false
  },
  {
    id: "4",
    name: "Grocery",
    isSelected: false
  }
];