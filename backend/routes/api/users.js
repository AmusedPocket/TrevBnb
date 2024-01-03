const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4})
        .withMessage('Please provide a username with atleast 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('Firstname cannot be an email.'),
    check('firstName')
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Lastname cannot be an email.'),
    check('lastName')
        .notEmpty()
        .withMessage('Last Name is required'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6})
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


//Sign up a new user
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const usernameFinder = await User.findOne({
        where: {
          username: username
        }
      });
      if(usernameFinder){
        res.status(500)
        const resObj = {
          message: "User already exists",
          errors: {
            username: "User with that username already exists"
          } }
       return res.json(resObj);
      };

      const useremailFinder = await User.findOne({
        where: {
          email: email
        }
      });
      if(useremailFinder){
        res.status(500)
        const resObj = {
          message: "User already exists",
          errors: {
            username: "User with that email already exists"
          } }
       return res.json(resObj);
      };
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: {
          id: safeUser.id,
          firstName: safeUser.firstName,
          lastName: safeUser.lastName,
          email: safeUser.email,
          username: safeUser.username
      }
      });
    }
  );

module.exports = router;