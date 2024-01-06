const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize, User, ReviewImage, Booking } = require('../../db/models');
const { Op, ValidationError } = require('sequelize');
const { handleValidationErrors } = require('../../utils/validation');



//Get current spots by the user
router.get('/current', requireAuth, async (req, res) => {
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
        if(review.avgStarRating){
            let avg = review.avgStarRating;
            listOfSpots[i].avgRating = avg.toFixed(1);
        } else {
            listOfSpots[i].avgRating = "No reviews found for this spot";
        }
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

const validateGet = [
    check('page')
        .default(1)
        .isInt({min: 1, max: 10})
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .default(1)
        .isInt({min: 1, max: 20})
        .withMessage("Size must be greater than or equal to 1"),
    check('maxLat')
        .optional()
        .isFloat()
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .optional()
        .isFloat()
        .withMessage("Minimum latitude is invalid"),
    check('maxLng')
        .optional()
        .isFloat()
        .withMessage("Maximum longitude is invalid"),
    check('minLng')
        .optional()
        .isFloat()
        .withMessage("Minimum longitude is invalid"),
    check('minPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .isFloat({min: 0})
        .withMessage("Minimum price must be greater than or equal to 0"),
    handleValidationErrors
];

//Get current spots, adds average review and preview to them
router.get('/', validateGet, async (req, res, next) => {
   
    const {page, size} = req.query;

    const pagination = {};

    pagination.limit = size;

    if(page > 1){
        pagination.offset = size * (page - 1);
    }



    let spots = await Spot.findAll({...pagination});
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
        // spotsList[i].avgRating = review.avgStarRating;
        if(review.avgStarRating){
            let avg = review.avgStarRating;
            spotsList[i].avgRating = avg.toFixed(1);
        } else {
            spotsList[i].avgRating = "No reviews found for this spot";
        }
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
    result.page = Number(page);
    result.size = Number(size);
    res.json(result);
})

//Adding a spot to an image
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404);
        const resObj = {
            message: "Spot couldn't be found"
        };
        return res.json(resObj);
    };

    let ownerIdObj = await Spot.findByPk(req.params.spotId, {
        attributes: ["ownerId"]
    })

    let ownerIdNumber = ownerIdObj.toJSON().ownerId;

    if(ownerIdNumber !== req.user.id){
        res.status(403);
        return res.json({message: "Forbidden"})
    }

    let newImg = await SpotImage.create({
        spotId: req.params.spotId,
        ...req.body
    });   

    const result = newImg.toJSON()

    res.json({
        id: result.id,
        url: result.url,
        preview: result.preview
    });
})

const validateSpot = [
    check('address')
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .notEmpty()
        .isFloat({min: -90, max: 90})
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .notEmpty()
        .isFloat({min: -180, max: 180})
        .withMessage('Longitude must be within -180 and 180'), 
    check('name')
        .notEmpty().withMessage("Name is required")
        .isLength({max: 50})
        .withMessage('Name must be less than 50 characters'),
    check('price')
        .isFloat({min: 0})
        .withMessage("Price per day must be a positive number"),
    check('description')
        .notEmpty()
        .withMessage('Description is required'),
    handleValidationErrors
];

//Create a new spot
router.post('/', requireAuth, validateSpot,  async (req, res) => {
   
 
    
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        ...req.body
    });
   
    return res.status(201).json(newSpot);
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
                attributes: ['id', 'firstName', 'lastName'],
                as: "Owner"
            }
        ]
    });

    if(!spot){
        res.status(404);
        return res.json({message: "Spot couldn't be found"});
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
    if(review.avgStarRating){
        let avg = review.avgStarRating;
        newSpot.avgStarRating = avg.toFixed(1);
    } else {
        newSpot.avgStarRating = "No reviews found for this spot"
    }
    
    newSpot.numReviews = reviewCount;
    
    res.json(newSpot)
});

//Edit a spot
router.put('/:spotId', requireAuth, validateSpot,  async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404);
        return res.json({message: "Spot couldn't be found"});
    }


    let ownerIdObj = await Spot.findByPk(req.params.spotId, {
        attributes: ['ownerId']
    })

    let ownerIdNum = ownerIdObj.toJSON().ownerId;
    if(ownerIdNum !== req.user.id){
        res.status(403);
        return res.json({ message: "Forbidden"});
    }

    await spot.update({...req.body});

    return res.json(spot.toJSON())
});

//Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        res.status(404)
        const resObj = {message: "Spot couldn't be found"};
        return res.json(resObj);
    }

    let ownerIdObj = await Spot.findByPk(req.params.spotId, {
        attributes: ['ownerId']
    });

    let ownerIdNum = ownerIdObj.toJSON().ownerId;
    if(ownerIdNum !== req.user.id){
        return res.status(403).json({message: "Forbidden"})
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

const validateReview = [
    check('review')
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .notEmpty()
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

//Create a review for a spot based on the spot id's
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.status(404).json({message: "Spot couldn't be found"})
    };
  

    const userReview = await Review.findOne({
        where: {
            spotId: spotId,
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

    res.status(201).json(newReview);
})

//Get bookings by the spotId
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
   
    if(!spot){
        res.status(404);
        return res.json({message: "Spot couldn't be found"});
    }
    let options = {};
    options.where = { spotId: req.params.spotId};

    if(spot.ownerId === req.user.id){
       options.attributes = ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'];
       options.include = {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
       }
    } else {
        options.attributes = ['spotId', 'startDate', 'endDate']
    }
    const bookings = await Booking.findAll(options);
    const resObj = {};
    resObj.Bookings = bookings.map(booking => {
        const bookingJSON = booking.toJSON();
        return bookingJSON;
    })
    res.json(resObj);
});

//Post a new booking
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404);
        return res.json({message: "Spot couldn't be found"});
    };

    if(spot.ownerId === req.user.id){
        res.status(403);
        return res.json({message: "Forbidden"});
    };

    const bookings = await Booking.findAll({where: {spotId: req.params.spotId}, attributes: ['startDate', 'endDate']});
    const errors = {};
    const bookingStart = new Date(req.body.startDate).getTime();
    const bookingEnd = new Date(req.body.endDate).getTime();
    const now = new Date().getTime();

    if(bookingStart < now && bookingEnd <= bookingStart){
        res.status(400);
        const resObj = {};
        resObj.message = "Bad Request";
        errors.startDate = "startDate cannot be in the past";
        errors.endDate = "endDate cannot be on or before startDate";
        resObj.errors = errors;
        return res.json(resObj);
    }
    
    if(bookingStart < now){
        res.status(400);
        const resObj = {};
        resObj.message = "Bad Request";
        errors.startDate = "startDate cannot be in the past";
        resObj.errors = errors;
        return res.json(resObj);
    }

    if(bookingEnd <= bookingStart){
        res.status(400);
        const resObj = {};
        resObj.message = "Bad Request";
        errors.endDate = "endDate cannot be on or before startDate";
        resObj.errors = errors;
        return res.json(resObj);
    }

    bookings.forEach(booking => {
        const bookingJSON = booking.toJSON();
        const startDate = new Date(bookingJSON.startDate).getTime();
        const endDate = new Date(bookingJSON.endDate).getTime();
        if(bookingStart === endDate){
            errors.startDate = "Start date cannot be on an existing end date."
        }
        if(startDate <= bookingStart && bookingStart < endDate){
            errors.startDate = "Start date conflicts with an existing booking";
        };
        if(startDate <= bookingEnd && bookingEnd <= endDate){
            errors.endDate = "End date conflicts with an existing booking";
        };
        if(bookingStart <= startDate && bookingEnd >= endDate){
            errors.startDate = "Start date conflicts with an existing booking";
            errors.endDate = "End date conflicts with an existing booking";
        }
    });

    if(errors.startDate || errors.endDate){
        res.status(403);
        const resObj = {};
        resObj.message = "Sorry, this spot is already booked for the specified dates";
        resObj.errors = errors;
        return res.json(resObj);
    }

    const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: Number(req.params.spotId),
        ...req.body
    });

    res.json(newBooking);
});

module.exports = router;