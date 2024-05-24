import Order from "../models/orders.js";
import { getNextOrderId } from "../utils/generate_order_id.js";

export const getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
}

export const createOrder = async (req, res) => {
    const { amount, currentTime } = req.body;
    const currentDateTime = new Date(currentTime);
   // 8 AM 
    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0); 
  // 2 AM next day
    const endTime = new Date(startTime);
    endTime.setHours(26, 0, 0, 0); 
  
    if (currentDateTime >= startTime && currentDateTime < endTime) {
      const orderId = await getNextOrderId(startTime, endTime);
      const newOrder = new Order({ orderId, amount, createdAt: currentDateTime });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } else {
      res.status(400).json({ message: 'Venue is closed at this time.' });
    }
}