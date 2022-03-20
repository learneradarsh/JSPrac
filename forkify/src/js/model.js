import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  searchResults: {},
};

export const getRecipeFromAPI = async recipeId => {
  try {
    let recipe = await getJSON(`${API_URL}${recipeId}`);
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

export const loadSearchResults = async query => {
  try {
    let searchResult = await getJSON(`${API_URL}?search=${query}`);
    searchResult.data.recipes.map(res => {
      return {
        id: res.id,
        image: res.image_url,
        publisher: res.publisher,
        title: res.title,
      };
    });
    state.searchResults = searchResult.data.recipes;
  } catch (error) {
    throw error;
  }
};
