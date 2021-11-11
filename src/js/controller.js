import * as model from './model.js';
import 'core-js/stable'; //polyfilling evertything else
import 'regenerator-runtime/runtime'; //polyfilling async/await
//console.log(icons);
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

//from parcel, hot module reload
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //console.log(id);
    if (!id) return; //guard clause
    recipeView.renderSpinner();

    // 0. update result view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    //1. updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 2. Loading the Recipe
    await model.loadRecipe(id);
    //3. Rendering the Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
    //err->this is not needed in the UI
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //console.log(resultsView);

    //1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3. render search results
    //console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);//all results at once
    resultsView.render(model.getSearchResultsPage());

    //4) REnder initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //3. render new search results
  //console.log(model.state.search.results);
  //resultsView.render(model.state.search.results);//all results at once
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4) REnder new pagination buttons
  paginationView.render(model.state.search);

  //paginationView.render(model.getSearchResultsPage(goToPage));
  //console.log(goToPage);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view
  //recipeView.render(model.state.recipe); //jugaad -> basically you're rerendering the whole recipe just to update the servings.
  //only changing where data has changed (not rendering the whole thing)
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/remove Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //2 . update recipeview
  //console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render Recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //Render the bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('My error', err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
