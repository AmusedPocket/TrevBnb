const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize, User, ReviewImage } = require('../../db/models');
const { Op, ValidationError } = require('sequelize');

//delete a spot-image
router.delete('/:imageId', requireAuth, async(req, res) => {
    const spotImage = await SpotImage.findOne({
        where: {id: req.params.imageId},
        attributes: ['id', 'spotId'],
        include: {
            model: Spot,
            attributes: ['id', 'ownerId']
        }
    });
    
    if(!spotImage){
        return res.status(404).json({message: "Spot Image couldn't be found"})
    };

    if(spotImage.Spot.ownerId !== req.user.id){
        return res.status(403).json({message: "Spot must belong to the current user"})
    };

    await spotImage.destroy();
    res.json({message: "Successfully deleted"});
    
})

module.exports = router;