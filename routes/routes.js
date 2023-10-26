const express = require('express');
const router = express.Router();
const movieController = require('./../controllers/movie');

router.get('/movies', movieController.getMovies);
router.post('/movies', movieController.createMovie);

module.exports = router;
