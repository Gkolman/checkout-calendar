const mongoose = require('mongoose');
require('dotenv').config();

const checkoutDBURI = `${process.env.DB_LOCAL}/checkoutDB`;

mongoose.connect(checkoutDBURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('connected to the checkout database'));

const checkoutDBSchema = mongoose.Schema({
  'listingId': String,
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

CheckoutDB.remove({}, () => console.log('cleared all rows in checkout db'));

const listingIdOptions = [0, 100];
const daysNoticeOptions = [0, 1, 2, 3, 7];
const monthsInAdvanceOptions = [0, 3, 6, 9, 12];
const cleaningFeeOptions = [0.15, 0.3];
const serviceFeeOptions = [0.1, 0.2];


const newListing = new CheckoutDB({
  'listingId': 1,
  'priceForDate': 123,
  'monthsInAdvance': 3,
  'daysNotice': 0,
  'cleaningFee': 0.1575,
  'serviceFee': 0.1250
});

newListing.save()
  .then(response => {
    console.log(`successfully created new Listing with the following checkout values ${response}`);
  })
  .catch(err => console.log(`there was an error creating the new listing ${err}`));
  

const getListingCheckoutInformation = (listingId) => {
  return new Promise((resolve, reject) => {
    CheckoutDB.find({ 'listingId': listingId })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};
  
module.exports = {
  getListingCheckoutInformation
};