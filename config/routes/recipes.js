const express = require('express');

const router = express.Router();
const recipes = require('../../app/controllers/recipes');

router.route('/').get(recipes.getRecipes).post(recipes.addRecipes);

router.route('/:id').put(recipes.updateRecipe).get(recipes.getRecipe);

module.exports = router;
