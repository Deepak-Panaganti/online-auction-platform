const Auction = require('../models/Auction');

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuction = async (req, res) => {
  const { title, description, startingBid } = req.body;
  
  const auction = new Auction({
    title,
    description,
    startingBid,
    bids: []
  });

  try {
    const newAuction = await auction.save();
    res.status(201).json(newAuction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const placeBid = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    const { amount, bidder } = req.body;
    
    auction.bids.push({ amount, bidder });
    const updatedAuction = await auction.save();

    res.status(200).json(updatedAuction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAuctions,
  createAuction,
  placeBid
};