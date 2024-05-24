import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderList from './OrderList';

describe('OrderList', () => {
  const orders = [
    { _id: '1', orderId: '001', amount: 100, createdAt: new Date().toISOString() },
    { _id: '2', orderId: '002', amount: 200, createdAt: new Date().toISOString() },
  ];

  test('renders orders correctly', () => {
    const { getByText } = render(<OrderList orders={orders} />);

    expect(getByText(/Order ID: 001/i)).toBeInTheDocument();
    expect(getByText(/Amount: 100/i)).toBeInTheDocument();
    expect(getByText(/Order ID: 002/i)).toBeInTheDocument();
    expect(getByText(/Amount: 200/i)).toBeInTheDocument();
  });
});
