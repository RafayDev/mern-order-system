import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderForm from './OrderForm';
import axios from 'axios';

jest.mock('axios');

describe('OrderForm', () => {
  test('renders form correctly', () => {
    render(<OrderForm onCreate={jest.fn()} />);

    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Order/i })).toBeInTheDocument();
  });

  test('submits form and creates order', async () => {
    const onCreate = jest.fn();
    const mockOrder = { _id: '1', amount: '100', currentTime: new Date().toISOString() };
    axios.post.mockResolvedValueOnce({ status: 201, data: mockOrder });

    render(<OrderForm onCreate={onCreate} />);

    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Current Time/i), { target: { value: new Date().toISOString().slice(0, 16) } });

    fireEvent.click(screen.getByRole('button', { name: /Create Order/i }));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/orders', expect.any(Object));
    expect(await screen.findByText(/Amount/i)).toHaveValue('');
    expect(onCreate).toHaveBeenCalledWith(mockOrder);
  });

  test('shows error on failed submission', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Error' } } });

    render(<OrderForm onCreate={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Current Time/i), { target: { value: new Date().toISOString().slice(0, 16) } });

    fireEvent.click(screen.getByRole('button', { name: /Create Order/i }));

    expect(await screen.findByText(/Error/i)).toBeInTheDocument();
  });
});
