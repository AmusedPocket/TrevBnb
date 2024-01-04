const express = require('express');
const router = express.Router();


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize, User, ReviewImage, Booking } = require('../../db/models');
const { Op, ValidationError } = require('sequelize');

//Get current users bookings
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;
    if(!user){
        return res.status(403).json({message: "Please sign in first in order to return bookings."})
    }
    const bookings = await Booking.findAll({
        where: {
            userId: user
        }, 
        include: [{
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }]
    });
    let bookingsArr = [];
    for(let booking of bookings){
        let bookingObj = booking.toJSON();
        bookingsArr.push(bookingObj);
    }
    for(let i = 0; i < bookingsArr.length; i++){
        let spotId = bookingsArr[i]['Spot']['id'];
        const previewImage = await SpotImage.findOne({
            where: {
                spotId: spotId,
                preview: true
            },
            attributes: ['url']
        })
        if(!previewImage) bookingsArr[i]['Spot']['id'].previewImage = "no preview image set";
        if(previewImage){
            let image = previewImage.toJSON();
            let spot = bookingsArr[i]['Spot'];
            spot.previewImage = image.url;
            bookingsArr[i].Spot = spot;
        }
    }
    return res.json({Bookings: bookingsArr})
})

//Edit existing booking
router.put('/:bookingId', requireAuth, async(req, res) => {
    //find the booking to edit
    const booking = await Booking.findByPk(req.params.bookingId);

    //if booking can't be found, error
    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    };

    //finds the booking's end date
    const bookingEndDate = new Date(booking.endDate).getTime();
    //generates current time 
    const now = new Date().getTime();

    //if past booking end date is occured prior to now (less than now), error
    if(bookingEndDate < now){
        return res.status(403).json({message: "Past bookings can't be modified"})
    };

    
    //if booking doesn't belong to the request user, error
    if(booking.userId !== req.user.id){
        return res.status(403).json({message: "Booking must belong to the current user to edit"})
    };

    const bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            id: {
                [Op.not]: req.params.bookingId
            }
        }, 
        attributes: ['startDate', 'endDate']
    });
    
    const errors = {};
    //updated start & end dates from the request body
    const bookingStart = new Date(req.body.startDate).getTime();
    const bookingEnd = new Date(req.body.endDate).getTime();
    
    
    if(bookingStart < now && bookingEnd <= bookingStart){
        res.status(400);
        const resObj = {};
        resObj.message = "Bad Request";
        errors.startDate = "startDate cannot be in the past";
        errors.endDate = "endDate cannot be on or before startDate";
        resObj.errors = errors;
        return res.json(resObj);
    }
    
    if(bookingEnd < now){
        return res.status(403).json({message: "Past bookings can't be modified"});
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
        if(startDate <= bookingStart && bookingStart < endDate){
            errors.startDate = "Start date conflicts with an existing booking";
        };
        if(startDate <= bookingEnd && bookingEnd <= endDate){
            errors.endDate = "End date conflicts with an existing booking";
        };
        if(bookingStart <= startDate && bookingEnd <= endDate){
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
    };

    booking.startDate = req.body.startDate;
    booking.endDate = req.body.endDate;
    await booking.save();
    res.json(booking);
})

//delete an existing booking
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking){
        return res.status(404).json({message: "Booking couldn't be found"})
    };
    
    const spot = await Spot.findByPk(booking.spotId);
    
    if(booking.userId !== req.user.id && spot.ownerId !== req.user.id){
        return res.status(403).json({message: "Booking must belong to the current user or the Spot must belong to the current user"})
    };

    const now = new Date().getTime();

    const startDate = new Date(booking.startDate).getTime();

    if(startDate < now){
        return res.status(403).json({message: "Bookings that have been started can't be deleted"})
    };

    await booking.destroy();

    res.json({message: "Successfully deleted"});

})

module.exports = router;