const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// retrieve the collection from mongoDB
const Genre = mongoose.model("Genre");

// ========= GET all =========
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// ========= POST add genres to the collection =========
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  const genreFromDB = await genre.save(genre);
  res.send(genreFromDB); 
});

// ========= PUT update requested genres in the collection =========
router.put("/:id" , async (req, res) => {
  // validate the genre before updating 
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id, 
    {name : req.body.name}, 
    {new : true}
  )

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// ========= DELETE remove requested course from the collection =========
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// ========= Return individual genre ========
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// validate the req.body
function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return (Joi.validate(genre, schema));
}

module.exports = router;
