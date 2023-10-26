const Movie = require('./../models/movie');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMovie = async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        synopsis: req.body.synopsis,
        genre: req.body.genre,
        duration: req.body.duration,
        director: req.body.director,
        actors: req.body.actors
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
