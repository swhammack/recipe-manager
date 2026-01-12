export type RecipeDto = {
  id: string;
  restaurantId: string;
  name: string;
  instructions: string;
  ingredients: string;
  yieldAmount: number;
  yieldUnit: string;
};
