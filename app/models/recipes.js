const mongoose = require('mongoose');

const OldRecipeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: 'Назва рецепту',
    required: true,
  },
  description: {
    type: String,
    default: 'Це опис за замовчуванням',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
});
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Назва рецепту',
    required: true,
  },
  description: {
    type: String,
    default: 'Це опис за замовчуванням',
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  oldVersions: [OldRecipeSchema],
});

mongoose.model('Recipes', RecipeSchema);
