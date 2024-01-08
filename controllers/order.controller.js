const { OrderModel } = require("../models/order.model");

const addOrder = async (req, res) => {
    try {
        const { user, books, totalAmount } = req.body;
        
        const order = new OrderModel({
          user,
          books,
          totalAmount,
        });
        
        await order.save();
    
        res.status(201).json({ message: "Order created successfully", order });
      } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};




const getOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find()
          .populate('User', '-password') // Exclude sensitive data from the user
          .populate('Book', 'title author'); // Only retrieve title and author of books
    
        res.status(200).json({ orders });
      } catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};




module.exports = { addOrder,getOrder};
