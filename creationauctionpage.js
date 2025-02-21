import React, { useState } from 'react';
import axios from 'axios';

function CreateAuctionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAuction = { title, description, startingBid };
    try {
      await axios.post('/api/auctions', newAuction);
      // Redirect to home or auction page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Starting Bid</label>
        <input type="number" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
      </div>
      <button type="submit">Create Auction</button>
    </form>
  );
}

export default CreateAuctionPage;