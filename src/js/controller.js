import * as model from './model.js';
import 'core-js/stable'; //polyfilling evertything else
import 'regenerator-runtime/runtime'; //polyfilling async/await
//console.log(icons);
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(err);
  }
};

//eventListerners
['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev, controlRecipes);
});
