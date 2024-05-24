import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App', () => {
  test('renders App component and fetches orders', async () => {
    const orders = [
      { _id: '1', orderId: '001', amount: 100, createdAt: new Date().toISOString() },
      { _id: '2', orderId: '002', amount: 200, createdAt: new Date().toISOString() },
    ];
    axios.get.mockResolvedValueOnce({ data: orders });

    render(<App />);

    await waitFor(() => expect(screen.getByText(/Order ID: 001/i)).toBeInTheDocument());
    expect(screen.getByText(/Order ID: 002/i)).toBeInTheDocument();
  });
});
