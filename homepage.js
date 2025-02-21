import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get('/api/auctions')
      .then(response => setAuctions(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Auctions</h1>
      <ul>
        {auctions.map(auction => (
          <li key={auction._id}>{auction.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;