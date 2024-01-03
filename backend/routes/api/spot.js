const express = require('express');
const router = express.Router();


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize, User, ReviewImage } = require('../../db/models');
const { Op, ValidationError } = require('sequelize');


//Get current spots by the user
router.get('/current', async (req, res) => {
    const user = req.user.id;
    const userSpots = await Spot.findAll({
        where: {
            ownerId: user
        }
    });

    let listOfSpots = [];

    for (let spot of userSpots){
        let spotObj = spot.toJSON();
        listOfSpots.push(spotObj);
    }
    //adding average to spots
    for(let i = 0; i < listOfSpots.length; i++){
        let spotId = listOfSpots[i]['id'];
        const rating = await Review.findOne({
            where: {spotId},
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")), 'avgStarRating'],
            ],
        });
        let review = rating.toJSON();
        listOfSpots[i].Average_Rating = review.avgStarRating;
    }
    //add preview image
    for(let i = 0; i < listOfSpots.length; i++){
        let spotId = listOfSpots[i]['id'];
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: spotId,
                preview: true
            },
            attributes: ['url', 'preview'],
        });
        
        if(spotImg){
            let preview = spotImg.toJSON();
            listOfSpots[i].previewImage = preview.url;

        }
    }

    let result = {};
    result.Spots = listOfSpots;

    res.json(result);
})

//Get current spots, adds average review and preview to them
router.get('/', async (req, res) => {
   

    let spots = await Spot.findAll();
    let spotsList = [];

    spots.forEach((spot) => {
        let spotObj = spot.toJSON();
        spotsList.push(spotObj);
    });
    //Add average rating
    for(let i = 0; i < spotsList.length; i++){
        let spotId = spotsList[i]['id'];
        const rating = await Review.findOne({
            where: {spotId},
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")), 'avgStarRating'],
            ],
        });
        let review = rating.toJSON();
        spotsList[i].avgRating = review.avgStarRating;
    }
    //add preview image
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

//Adding a spot to an image
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        const err = new Error("Spot couldn't be found");
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

    let ownerIdNumber = ownerIdObj.toJSON().ownerId;

    if(ownerIdNumber !== req.user.id){
        res.status(400);
        return res.json({message: "Must be the owner of the spot to post image"})
    }

    const result = newImg.toJSON()

    res.json({
        id: result.id,
        url: result.url,
        preview: result.preview
    });
})

//Create a new spot
router.post('/', requireAuth, async (req, res) => {
 
    const newSpot = await Spot.create({
        ...req.body
    })
   
    res.json(newSpot)
})

//Get details for a spot from an id
router.get('/:id', async (req, res, next) => {
  
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err);
    }

    const rating = await Review.findOne({
        where: {spotId},
        attributes: [
            [sequelize.fn("AVG", sequelize.col("stars")), 'avgStarRating'],
        ],
    });

    const reviewCount = await Review.count({
        where: {spotId}
    });

    let review = rating.toJSON();
    let newSpot = spot.toJSON();
    newSpot.avgStarRating = review.avgStarRating;
    newSpot.numReviews = reviewCount;
    
    res.json(newSpot)
});

//Edit a spot
router.put('/:spotId', requireAuth,  async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if(price < 0){
        const err = new Error("Price per day must be a positive number");
        err.status = 400;
        next(err);
    };
    if(!address){
        const err = new Error("Street address is required");
        err.status = 400;
        next(err);
    };
    if(!city){
        const err = new Error("City is required");
        err.status = 400;
        next(err);
    };
    if(!state){
        const err = new Error("State is required");
        err.status = 400;
        next(err);
    };
    if(!country){
        const err = new Error("Country is required");
        err.status = 400;
        next(err);
    };
    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    };
    if(lat > 90 || lat < -90){
        const err = new Error("Latitude must be within -90 and 90");
        err.status = 404;
        next(err);
    };
    if(lng > 180 || lng < -180){
        const err = new Error("Longitude must be within -180 and 180");
        err.status = 404;
        next(err);
    };
    if(!description){
        const err = new Error("Description is required");
        err.status = 404;
        next(err);
    }
    let ownerIdObj = await Spot.findByPk(req.params.spotId, {
        attributes: ['ownerId']
    })

    let ownerIdNum = ownerIdObj.toJSON().ownerId;
    if(ownerIdNum !== req.user.id){
        res.status = 400;
        return res.json({ message: "Must be owner to update spot "});
    }

    await spot.update({...req.body});

    return res.json(spot.toJSON())
});

//Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        res.status = 404;
        return res.json({message: "Spot couldn't be found"});
    };

    let ownerIdObj = await Spot.findByPk(req.params.spotId, {
        attributes: ['ownerId']
    });

    let ownerIdNum = ownerIdObj.toJSON().ownerId;
    if(ownerIdNum !== req.user.id){
        res.status = 400;
        return res.json({ message: "Must be owner to delete spot "});
    };
  
    await spot.destroy();

    return res.json({message: "Successfully deleted"});
})

//Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    }
    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    })

    res.json({Reviews: reviews})
})

//Create a review for a spot based on the spot id's
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    };
    const {review, stars} = req.body;
    if(!review){
        return res.status(400).json({message: "Review text is required"})
    };
    if(!Number.isInteger(stars) || stars < 1 || stars > 5){
        return res.status(400).json({message: "Stars must be an integer from 1 to 5"})
    };

    const userReview = await Review.findOne({
        where: {
            userId: req.user.id
        }
    });

    if(userReview){
        return res.status(500).json({message: "User already has a review for this spot"})
    };

    const newReview = await Review.create({
        spotId: Number(spotId),
        userId: req.user.id,
        ...req.body
    });

    res.json(newReview)
})

//Error Handler
router.use((err, req, res, next) => {
    
    res.status(err.status || 500)
    res.send({error: err.message});
});

module.exports = router;