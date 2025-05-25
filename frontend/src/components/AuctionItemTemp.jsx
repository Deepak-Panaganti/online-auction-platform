import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [bid, setBid] = useState(0);
  const [message, setMessage] = useState('');






  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/auctions/${id}`);
        setItem(res.data);
      } catch (error) {
        setMessage('Error fetching auction item: ' + error.response?.data?.message || error.message);
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);




// for the auto update for every 5 seconds 
// for the auto update for every 5 seconds 

// insted of above code from 
//..........................
//useEffect  to}, [id]);
//.................................

// for the auto update for every 5 seconds 
// for the auto update for every 5 seconds 
// for the auto update for every 5 seconds 
// useEffect(() => {
//   const fetchItem = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5001/auctions/${id}`);
//       setItem(res.data);
//     } catch (error) {
//       setMessage('Error fetching auction item: ' + error.response?.data?.message || error.message);
//       console.error(error);
//     }
//   };

//   fetchItem(); // Initial fetch

//   const interval = setInterval(fetchItem, 5000); // Refresh every 5 seconds

//   return () => clearInterval(interval); // Cleanup on unmount
// }, [id]);














  // const handleBid = async () => {
  //   const username = prompt('Enter your username to place a bid:');

  //   if (bid <= item.currentBid) {
  //     setMessage('Bid must be higher than the current bid.');
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(`http://localhost:5001/bid/${id}`, { bid, username });
  //     setMessage(res.data.message);
  //     if (res.data.winner) {
  //       setMessage(`Auction closed. Winner: ${res.data.winner}`);
  //     }
  //   } catch (error) {
  //     setMessage('Error placing bid.');
  //     console.error(error);
  //   }
  // };





const handleBid = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    setMessage('You must be signed in to place a bid.');
    return;
  }

  const numericBid = Number(bid);

  if (isNaN(numericBid)) {
    setMessage('Please enter a valid number.');
    return;
  }

  if (numericBid <= item.currentBid) {
    setMessage('Bid must be higher than the current bid.');
    return;
  }

  try {
    const res = await axios.post(
      `http://localhost:5001/bid/${id}`,
      { bid: numericBid },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessage(res.data.message);
    if (res.data.winner) {
      setMessage(`Auction closed. Winner: ${res.data.winner}`);
    } else {
      const updated = await axios.get(`http://localhost:5001/auctions/${id}`);
      setItem(updated.data);
    }
  } catch (error) {
    setMessage(error.response?.data?.message || 'Error placing bid.');
    console.error(error);
  }
};







  return (
    <div>
      <h2>{item.itemName}</h2>
      <p>{item.description}</p>
      <p>Current Bid: ${item.currentBid}</p>
      <p>Highest Bidder: {item.highestBidder || 'No bids yet'}</p>
      <input
        type="number"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        placeholder="Enter your bid"
      />
      <button onClick={handleBid}>Place Bid</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuctionItem;