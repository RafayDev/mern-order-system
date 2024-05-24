import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Order List</h2>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order._id} className="py-2">
            <div className="flex justify-between">
              <span>Order ID: {order.orderId}</span>
              <span>Amount: {order.amount}</span>
              <span>Created At: {new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
