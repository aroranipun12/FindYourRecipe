import * as model from './model.js';
import 'core-js/stable'; //polyfilling evertything else
import 'regenerator-runtime/runtime'; //polyfilling async/await
//console.log(icons);
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return; //guard clause
    recipeView.renderSpinner();

    // 1. Loading the Recipe
    await model.loadRecipe(id);
    //2. Rendering the Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    //err->this is not needed in the UI
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
