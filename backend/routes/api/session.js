const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage("Email or username is required"),
    check('password')
        .exists({checkFalsy: true})
        .withMessage("Password is required"),
    handleValidationErrors
];

router.post( '/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    
    

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    if(!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        return res.status(401).json({message: "Invalid credentials"})
    };

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
});

//sign out user
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'});
 }
);

//get current user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.json({
            user: {
                id: safeUser.id,
                firstName: safeUser.firstName,
                lastName: safeUser.lastName,
                email: safeUser.email,
                username: safeUser.username
            }
          
        });
      } else return res.json({ user: null });
    }
  );


module.exports = router;