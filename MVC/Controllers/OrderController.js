import orderModel from "../Models/OrderModel.js" // Import your order model

// PLACE ORDER
export const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please provide a food cart or payment method",
      });
    }

    let total = 0;
    // Calculate total price
    cart.forEach((item) => {
      total += item.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error In Place Order API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide a valid order ID",
      });
    }

    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order Status Updated",
      order, // Optionally include the updated order in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};
