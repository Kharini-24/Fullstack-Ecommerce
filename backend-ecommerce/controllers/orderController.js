import Order from "../models/Order.js"

// CREATE NEW ORDER
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" })
    }

    const order = new Order({
      user: req.user._id, // 🔐 from JWT
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  
}
// GET LOGGED IN USER ORDERS
export const getMyOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id })
      res.json(orders)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate("user", "name email"); // show who ordered
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};