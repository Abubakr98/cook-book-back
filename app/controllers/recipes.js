/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const Recipes = mongoose.model('Recipes');

const getRecipe = (req, res) => {
  Recipes.findOne({ _id: req.params.id })
    .exec()
    .then((recipe) => {
      const {
        _id, name, description, ingredients, oldVersions,
        date,
      } = recipe;
      res.json({
        _id, name, description, ingredients, date, oldVersions: oldVersions.reverse(),
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getRecipes = (req, res) => {
  Recipes.find({}, ['_id', 'name', 'description', 'date'])
    .exec()
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};
const addRecipes = (req, res) => {
  const {
    name, description, ingredients, date = new Date(),
  } = req.body;
  Recipes.create({
    name,
    description,
    ingredients,
    date,
  })
    .then((createdGroup) => res.json(createdGroup))
    .catch((err) => res.status(500).json({ message: err.message }));
};
const updateRecipe = (req, res) => {
  const {
    name, ingredients, description, date = new Date(),
  } = req.body;
  Recipes.findOne({ _id: req.params.id })
    .exec()
    .then((recipe) => {
      recipe.oldVersions.push({
        id: recipe.oldVersions.length,
        name: recipe.name,
        ingredients: recipe.ingredients,
        description: recipe.description,
        date: recipe.date,
      });
      recipe.name = name;
      recipe.ingredients = ingredients;
      recipe.description = description;
      recipe.date = date;
      recipe.save((err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(recipe);
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  getRecipes,
  addRecipes,
  updateRecipe,
  getRecipe,
};
