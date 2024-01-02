const express = require('express');
const router = express.Router();


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize, User, ReviewImage } = require('../../db/models');
const { Op, ValidationError } = require('sequelize');

router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;
    console.log("test")
    const reviews = await Review.findAll({
        where: {
            userId: user
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    });
    let reviewArr = [];
    for(let review of reviews){
        let reviewObject = review.toJSON();
        reviewArr.push(reviewObject);
    };

    for(let i = 0; i < reviewArr.length; i++){
        let spotId = reviewArr[i]['Spot']['id'];
        const previewImage = await SpotImage.findOne({
            where: {
                spotId: spotId,
                preview: true
            },
            attributes: ['url', 'preview']
        })
       
        let spotImg = previewImage.toJSON();
        let spot = reviewArr[i]['Spot'];
        spot.previewImage = spotImg.url;
        reviewArr[i].Spot = spot;
    };


    
    res.json({Reviews: reviewArr});
});



module.exports = router;