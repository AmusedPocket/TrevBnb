const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js')

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/reviews', reviewsRouter);

router.use('/spots', require('./spot.js'))

router.use('/bookings', bookingsRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;