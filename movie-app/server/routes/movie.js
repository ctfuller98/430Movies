var express = require('express');
var router = express.Router();
const Movie= require('../models/movie');
const sequenceGenerator = require('./sequenceGenerator');
router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.status(200).json({
          message: 'Movies fetched successfully!',
          movies: movies
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

 router.post('/', (req, res) => {
    const maxMovieId = sequenceGenerator.nextId("movies");;
    console.log(maxMovieId)
    const movie = new Movie({
        id: maxMovieId,
        title: req.body.title,
        rating: req.body.rating,
        imgurl: req.body.imgurl,
        score: req.body.score,
        review: req.body.review
    });
  
    movie.save()
      .then(createdMovie => {
        res.status(201).json({
          message: 'Movie added successfully',
          movie: createdMovie
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });
 
router.put('/:id', (req, res) => {
   Movie.findOne({ id: req.params.id })
      .then(movie => {
        movie.title = req.body.title;
        movie.rating = req.body.rating;
        movie.imgurl = req.body.imgurl;
        movie.score = req.body.score;
        movie.review = req.body.review;
  
        Movie.updateOne({ id: req.params.id }, movie)
          .then(result => {
            res.status(204).json({
              message: 'Movie updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Movie not found.',
          error: { movie: 'Movie not found'}
        });
      });
  });
router.delete("/:id", (req, res) => {
    Movie.findOne({ id: req.params.id })
      .then(movie => {
        Movie.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Movie deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Movie not found.',
          error: { movie: 'Movie not found'}
        });
      });
  });
module.exports = router; 