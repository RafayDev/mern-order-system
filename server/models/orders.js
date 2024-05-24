import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    orderId: Number,
    amount: Number,
    createdAt: Date
  });
  
const Order = mongoose.model('Order', orderSchema);

export default Order