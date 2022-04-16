const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * @description process payment for the order
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns {} object: json
 */
const processPayment = asyncWrapper(async (req, res, next) => {
  const userPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "BlinkAndBuy",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: userPayment.client_secret });
});

/**
 * @description get stripe api key (public key)
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns Object: Json
 */
const sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = {
  processPayment,
  sendStripeApiKey,
};
