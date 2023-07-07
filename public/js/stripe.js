/* eslint-disable */
import axios from 'axios';

const stripe = Stripe(
  'pk_test_51NP3zNK4tyig9sHxqf4VKseAflrZ1KZMXBoD0KldUJrFEIS4mgzh9hI2PyxUgJcjVlDh0UzgU7Im2uuFp9RFTWh90038O0INB3'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
