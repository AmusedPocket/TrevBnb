const express = require('express');
const router = express.Router();


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize } = require('../../db/models');
const { Op } = require('sequelize');


//Get current spots, adds average review and preview to them
router.get('/', async (req, res) => {
   
    // const spots = await Spot.findAll({
    //     include: [{
    //         model: SpotImage,
    //         attributes: ['url']
    //     }, {
    //         model: Review,
    //         attributes: [
    //             'stars'
    //             // [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgReview']
    //         ]
    //     }]
    // });
    let spots = await Spot.findAll();
    let spotsList = [];

    spots.forEach((spot) => {
        let spotObj = spot.toJSON();
        spotsList.push(spotObj);
    });

    for(let i = 0; i < spotsList.length; i++){
        let spotId = spotsList[i]['id'];
        const rating = await Review.findOne({
            where: {spotId},
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")), 'avgStarRating'],
            ],
        });
        let review = rating.toJSON();
        spotsList[i].Average_Rating = review.avgStarRating;
    }

    for(let i = 0; i < spotsList.length; i++){
        let spotId = spotsList[i]['id'];
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: spotId,
                preview: true
            },
            attributes: ['url', 'preview'],
        });
        
        if(spotImg){
            let preview = spotImg.toJSON();
            spotsList[i].previewImage = preview.url;

        }
    }

    let result = {};
    result.Spots = spotsList;

    res.json(result);
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        const err = new Error("Spot does not exist");
        err.status = 404;
        return next(err);
    };

    let newImg = await SpotImage.create({
        spotId: req.params.spotId,
        ...req.body
    });
    //finding the spot's owner
    let ownerIdObj = await Spot.findByPk(req.params.spotId, {
        attributes: ["ownerId"]
    })

    let ownerId = ownerIdObj.toJSON().ownerId;

    if(ownerId !== req.user.id){
        res.status(400);
        return res.json({message: "Must be the owner of the spot to post image"})
    }

    res.json(newImg.toJSON());
})

router.post('/', requireAuth, async (req, res) => {
    
    const newSpot = await Spot.create({
        ...req.body
    })
   
    res.json(newSpot)
})

module.exports = router;