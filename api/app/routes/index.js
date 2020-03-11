const router = require('express').Router();

router.use('/games', require('./game'));

module.exports = router;