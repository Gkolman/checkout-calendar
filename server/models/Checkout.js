const mongoose = require('mongoose');
// require('dotenv').config();

const checkoutDBURI = 'mongodb://localhost:27017/checkoutDB';

mongoose.connect(checkoutDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('connected to the checkout database'));

const checkoutDBSchema = mongoose.Schema({
  'listingId': Number,
  'unavailableDates': {
    type: [Date],
    default: [],
  },
  'priceForDate': Number,
  'daysNotice': Number,
  'monthsInAdvance': Number,
  'monthlyDiscount': {
    type: Number,
    default: 0.49,
  },
  'weeklyDiscount': {
    type: Number,
    default: 0.21
  },
  'newListingPromoDiscount': {
    type: Number,
    default: 0.20
  },
  'cleaningFee': Number,
  'serviceFee': Number
});

const CheckoutDB = mongoose.model('CheckoutDB', checkoutDBSchema);

if (!CheckoutDB) {

  const getRandomInclusiveIntervals = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const daysNoticeOptions = [0, 1, 2, 3, 7];
  const monthsInAdvanceOptions = [0, 3, 6, 9, 12];
  const cleaningFeeOptions = [0.15, 0.3];
  const serviceFeeOptions = [0.1, 0.2];

  for (let i = 0; i < 100; i++) {

    let daysNoticeIndex = getRandomInclusiveIntervals(0, 4);
    let monthsInAdvanceIndex = getRandomInclusiveIntervals(0, 4);

    let priceForDate = Number.parseFloat(Math.random() * (300 - 75) + 75);
    priceForDate = priceForDate.toString().split('.');
    priceForDate[1] = (priceForDate[1].slice(0, 2));
    priceForDate = Number.parseFloat(priceForDate.join('.'));

    let cleaningFee = Number.parseFloat(Math.random() * (cleaningFeeOptions[1] - cleaningFeeOptions[0]) + cleaningFeeOptions[0]).toPrecision(4);
    let serviceFee = Number.parseFloat(Math.random() * (serviceFeeOptions[1] - serviceFeeOptions[0]) + serviceFeeOptions[0]).toPrecision(4);


    let newListing = new CheckoutDB({
      priceForDate,
      cleaningFee,
      serviceFee,
      'listingId': Number(i + 1),
      'monthsInAdvance': monthsInAdvanceOptions[monthsInAdvanceIndex],
      'daysNotice': daysNoticeOptions[daysNoticeIndex],
    });

    newListing.save()
      .then(response => {
        console.log(`successfully created new Listing with the following checkout values ${response}`);
      })
      .catch(err => console.log(`there was an error creating the new listing ${err}`));

  }
} 


const getListingCheckoutInformation = (listingId) => {
  listingId = Number(listingId);

  return new Promise((resolve, reject) => {
    CheckoutDB.find({ 'listingId': listingId })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};



module.exports = {
  getListingCheckoutInformation
};