const express = require('express');
const path = require('path');
const { getListingCheckoutInformation } = require('./models/Checkout');

const app = express();

app.use('/:productId', express.static(path.join(__dirname, '../public')));

app.get('/checkoutInformation/:productId', (req, res) => {
  if (Number(req.params.productId) > 100) {
    res.send('invalid product id');
  }
  
  getListingCheckoutInformation(req.params.productId)
    .then(response => res.send(response[0]))
    .catch(err => console.log(`error looking for checkout information ${err}`));
});

app.listen(3004, () => console.log('connected to server'));