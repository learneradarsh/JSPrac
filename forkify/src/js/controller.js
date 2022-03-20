import * as model from './model';
import recipeView from './views/RecipeView';

const controlRecipe = async () => {
  try {
    recipeView.spinloader();
    await model.getRecipeFromAPI();
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
  }
};

controlRecipe();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
