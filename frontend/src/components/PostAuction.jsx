import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  // useHistory instead of useNavigate

function PostAuction() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState(0);
  const [closingTime, setClosingTime] = useState('');
  const history = useHistory();  // useHistory hook

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      history.push('/signin'); // Redirect to login if not authenticated
    }
  }, [history]);

  const handlePostAuction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be signed in to post an auction.');
      history.push('/signin');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5001/auction',
        { itemName, description, startingBid, closingTime },
        { headers: { Authorization: `Bearer ${token}` } } // Send token in headers
      );

      alert('Auction item posted!');
      history.push('/dashboard');
    } catch (err) {
      alert('Failed to post auction. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Post New Auction</h2>
      <form onSubmit={handlePostAuction}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Starting Bid"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          required
        />
        <button type="submit">Post Auction</button>
      </form>
    </div>
  );
}

export default PostAuction;
