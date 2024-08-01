const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.paymentController = async (req, res) => {
  console.log(req);
  const { amount, currency, paymentMethodType } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethodType],
    });

    const payment = new Payment({
      id: paymentIntent.id,
      amount,
      currency,
      status: paymentIntent.status,
    });

    await payment.save();
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
