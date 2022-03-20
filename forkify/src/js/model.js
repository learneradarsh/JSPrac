import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
};

export const getRecipeFromAPI = async () => {
  try {
    let recipe = await getJSON(`${API_URL}/5ed6604591c37cdc054bc886`);
    recipe = transformRecipeResponseFormat(recipe.data.recipe);
    state.recipe = recipe;
  } catch (error) {
    throw error;
  }
};

export const transformRecipeResponseFormat = data => {
  return {
    id: data.id,
    sourceUrl: data.source_url,
    image: data.image_url,
    title: data.title,
    cookingTime: data.cooking_time,
    publisher: data.publisher,
    ingredients: data.ingredients,
    servings: data.servings,
  };
};
