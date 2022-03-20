import * as model from './model';
import recipeView from './views/RecipeView';

const controlRecipe = async () => {
  try {
    await model.getRecipeFromAPI();
    recipeView.spinloader(true);
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

controlRecipe();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
