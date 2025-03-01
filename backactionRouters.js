const express = require('express');
const router = express.Router();
const { getAuctions, createAuction, placeBid } = require('../controllers/auctionController');

router.get('/', getAuctions);
router.post('/', createAuction);
router.post('/:id/bid', placeBid);

module.exports = router;