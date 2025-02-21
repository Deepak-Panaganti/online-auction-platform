import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuctionPage() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    axios.get(`/api/auctions/${id}`)
      .then(response => setAuction(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleBid = () => {
    // Implement bid handling logic
  };

  return (
    <div>
      {auction && (
        <>
          <h1>{auction.title}</h1>
          <p>{auction.description}</p>
          <h2>Starting Bid: ${auction.startingBid}</h2>
          <button onClick={handleBid}>Place Bid</button>
        </>
      )}
    </div>
  );
}

export default AuctionPage;