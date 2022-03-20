import * as model from './model';
import recipeView from './views/RecipeView';
import searchView from './views/SearchView';
import searchResultsView from './views/SearchResults';

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.spinloader();
    await model.getRecipeFromAPI(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
  }
};

const controlSearch = async () => {
  try {
    searchResultsView.spinloader();
    await model.loadSearchResults(searchView.getSearchQuery());
    console.log(model.state.searchResults);
    searchResultsView.render(model.state.searchResults);
  } catch (error) {
    searchResultsView.renderError(error);
  }
};

const init = async () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.handleSearch(controlSearch);
};

init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
