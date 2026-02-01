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
  