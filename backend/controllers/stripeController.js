const stripe = require("stripe")(process.env.STRIPE_PUBLIC8KEY);
const handelStripe = async (req, res) => {
  const { paymentMethodId, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "your company descritpion",
      payment_method: paymentMethodId,
      confirm: true,
      payment_method: "pm_card_visa",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({ message: "payement successful", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed", success: false });
  }
};
/*
const webhookUrl = stripe.webhookEndpoints.create({
  url: 'http://localhost:5173/checkout-success',
  enabled_events: [
    'charge.failed',
    'charge.succeeded'
  ]
}, function(err, webhookEndpoint) {
  if (err) {
    console.error('Error creating webhook endpoint:', err);
  } else {
    console.log('Webhook endpoint created:', webhookEndpoint);
  }
 
});
console.log(webhookUrl)
app.post('/create-checkout-session', async (req, res) => {
  const {  productsInCart } = req.body;
  console.log(productsInCart);
  const line_items = productsInCart.map(
    ({ id, name, qauntity, price, image }) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            images: [image],
            metadata: {
              id: id,
            },
          },
          unit_amount: price * 1000,
        },
        quantity:qauntity,
      };
    }
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: webhookUrl,
    cancel_url: "https://www.facebook.com",
  });
  console.log(session.url);
  res.send({ url: session.url });
});*/
module.exports = {
  handelStripe,
};
