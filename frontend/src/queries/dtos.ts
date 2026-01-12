export type RecipeDto = {
  id: string;
  restaurantId: string;
  title: string;
  instructions: string;
  ingredients: string[];
  yieldAmount: number;
  yieldUnit: string;
};
