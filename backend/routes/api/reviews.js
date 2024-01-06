const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize, User, ReviewImage } = require('../../db/models');
const { Op, ValidationError } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');

//get all reviews by a user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;
    
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
    console.log("reviews is: ", reviews)
    if(reviews.reviewImages === undefined){
        reviews.reviewImages = "User has not submitted any review images";
    }
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
        if(!previewImage) reviewArr[i]['Spot']['id'].previewImage = "no preview image set";
        if(previewImage){
            let spotImg = previewImage.toJSON();
            let spot = reviewArr[i]['Spot'];
            spot.previewImage = spotImg.url;
            reviewArr[i].Spot = spot;
        }
    };


    
    res.json({Reviews: reviewArr});
});

//add an image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId); 

    if(!review){
        return res.status(404).json({message: "Review couldn't be found"})
    };
    if(review.userId !== req.user.id){
        return res.status(403).json({message: "Forbidden"})
    };
    const imageCount = await ReviewImage.findAll({
        where: {
            reviewId: Number(req.params.reviewId)
        }
    });
    if(imageCount.length >= 10){
        return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    }

    const newImage = await ReviewImage.create({
        reviewId: Number(req.params.reviewId),
        ...req.body
    });

    
    res.json({id: newImage.id, url: newImage.url});
})

const validateReview = [
    check('review')
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

//edit a review based on the review's id
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const reviewLocator = await Review.findByPk(req.params.reviewId);
    if(!reviewLocator){
        return res.status(404).json({message: "Review couldn't be found"})
    };
    if(reviewLocator.userId !== req.user.id){
        return res.status(403).json({message: "Forbidden"})
    };
    
    await reviewLocator.update({...req.body});

    res.json(reviewLocator)
})

//delete a review by review id
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if(!review){
        return res.status(404).json({message: "Review couldn't be found"})
    }
   
    if(req.user.id !== review.userId){
        return res.status(403).json({message: "Forbidden"})
    };

    await review.destroy();

    return res.json({message: "Successfully deleted"})

})

module.exports = router;