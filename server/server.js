const express = require('express');
const path = require('path');
const { getListingCheckoutInformation, clearDatabaseUtility } = require('./models/Checkout');

const app = express();

app.use(express.static('public'));

app.get('/checkoutInformation/:productId', (req, res) => {
  if (Number(req.params.productId) > 100) {
    res.send('invalid product id');
  }
  
  getListingCheckoutInformation(req.params.productId)
    .then(response => res.send(response[0]))
    .catch(err => console.log(`error looking for checkout information ${err}`));
});

//will be removed for production after seeding is tested and complete
app.get('/clearDatabaseUtility', (req, res) => {
  clearDatabaseUtility()
    .then(() => console.log('cleared database'))
    .catch(err => console.log('there was an error clearing the database: ', err));
});

app.listen(3000, () => console.log('connected to server'));