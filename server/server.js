const express = require('express');
const { getListingCheckoutInformation } = require('./models/Checkout');

const app = express();

app.get('/', (req, res) => {
  res.send('hello logged on');
});

app.get('/checkoutInformation/:productId', (req, res) => {
  getListingCheckoutInformation(1)
    .then(response => res.send(response))
    .catch(err => console.log(`error looking for checkout information ${err}`));
});


app.listen(3000, () => console.log('connected to server'));