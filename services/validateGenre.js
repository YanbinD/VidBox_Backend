const Joi = require("joi");
// validate the req.body
function validateGenre(genre) {
    const schema = {
      name: Joi.string()
        .min(3)
        .required()
    };
  
    return (Joi.validate(genre, schema));
  }
  
  exports.validateGenre = validateGenre;