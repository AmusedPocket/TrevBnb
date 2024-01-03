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

module.exports = router;