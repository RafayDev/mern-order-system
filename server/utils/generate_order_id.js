import Order from "../models/orders.js";
export const getNextOrderId = async (startTime, endTime) => {
  
    const currentOrderCount = await Order.countDocuments({
      createdAt: { $gte: startTime, $lt: endTime }
    });
  
    return currentOrderCount + 1;
  };

