const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) { 
      const errors = {};
      validationErrors
        .array()
        .forEach(error => errors[error.path] = error.msg);
  
      res.status(400);
      const resObj = {};
      resObj.message = "Bad request";
      resObj.errors = errors;
      return res.json(resObj);
    }
    next();
  };

module.exports = {
    handleValidationErrors
};