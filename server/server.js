const express = require('express');
const path = require('path');
const { getListingCheckoutInformation, updateListingInformation,deleteListingInformation, addListingInformation} = require('./models/Checkout');

const app = express();
app.use('/:productId', express.static(path.join(__dirname, '../public')));

var cassandraDb = require('./models/cassandraDb.js')
// var postgresDb = require('./models/postgresDb.js')




app.get('/db/:id', (req, res) => {
  var id = req.params.id;
  getListingCheckoutInformation(id)
  .then((data) => {
    console.log('data ->', data)
    var data = `listing data for id  -> , ${id}`
    res.send(data)
  })
  .catch((err) => {
    console.log(`get listing error -> `, err)
    res.send(`get listing error -> `, err)
  })
})
app.post('/db/:id', (req, res) => {
  var id = req.params.id;
  addListingInformation(id)
  res.send(`item created with id ${id}`)
})

app.put('/db/:id', (req, res) => {
  var id = req.params.id;
  var data = req.body
  updateListingInformation(id, data)
  .then((data) => {
    var message  = `updated listing data for id  -> , ${id}`
    res.send(message)
  })
  .catch((err) => {
    var message = `could not update listing data for id -> ${id}, ${err}`
    res.send(message)
  })
})

app.delete('/db/:id', (req, res) => {
  var id = req.params.id;
  deleteListingInformation(id)
  .then((response) => {
    var message = `item with is ${id} has been removed from db`
    res.send(message)
  })
  .catch((err) => {
    var message = `item with ${id} was not removed from db -> ${err}`
    res.send(message)
  })
})


app.get('/bundle.js', (req, res) => {
  // if (Number(req.params.productId) > 100) {
  //   res.send('invalid product id');
  // }
  console.log('entring bundle request')
  res.sendFile(path.join(__dirname, '../public/bundle.js'))
})

app.get('/bundle.js', (req, res) => {
  // if (Number(req.params.productId) > 100) {
  //   res.send('invalid product id');
  // }
  console.log('entring bundle request')
  res.sendFile(path.join(__dirname, '../public/bundle.js'))
})

app.get('/checkoutInformation/:productId', (req, res) => {
  if (Number(req.params.productId) > 100) {
    res.send('invalid product id');
  }

  getListingCheckoutInformation(req.params.productId)
    .then(response => res.send(response[0]))
    .catch(err => console.log(`error looking for checkout information ${err}`));
});

app.listen(3004, () => console.log('connected to server'));