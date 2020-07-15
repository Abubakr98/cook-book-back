const express = require('express');
const recipes = require('./recipes');

const router = express.Router();

router.use('/recipes', recipes);

router.use('*', (req, res) => {
  res.send('404 page not found');
});

module.exports = router;
