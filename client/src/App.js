import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    };
    fetchOrders();
  }, []);
  const venueStartTime = new Date();
  venueStartTime.setHours(8,0,0,0);

  const venueEndTime = new Date();
  venueEndTime.setHours(26,0,0,0);

  const handleCreateOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">Order System</h1>
      <h2 className="text-xl font-semibold mb-4">Venue Start Time : {venueStartTime.toLocaleString()}</h2>
      <h2 className="text-xl font-semibold mb-4">Venue End Time :{venueEndTime.toLocaleString()}</h2>
      <OrderForm onCreate={handleCreateOrder} />
      <OrderList orders={orders} />
    </div>
  );
};

export default App;
