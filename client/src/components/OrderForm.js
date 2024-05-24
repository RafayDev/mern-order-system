import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ onCreate }) => {
  const [amount, setAmount] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toISOString().slice(0, 16));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders', { amount, currentTime });
      if (response.status === 201) {
        onCreate(response.data);
        setAmount('');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Current Time: </label>
        <input
          type="datetime-local"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Create Order
      </button>
    </form>
  );
};

export default OrderForm;
