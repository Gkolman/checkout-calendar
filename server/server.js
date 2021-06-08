const express = require('express');
const path = require('path');
const app = express();
var port = 3000

app.use('/:productId', express.static(path.join(__dirname, '../public')));
var axios = require('axios');
var newRelic = require('newrelic');

app.get('/db/:id', (req, res) => {
  var id = req.params.id;
  getDataFromDbWithId(id)
  .then((data) => {
    res.send(data)
  })
  .catch((error) => {
    console.log('db: error from get request -> ', error)
    res.send(error)
  })
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


app.get('/checkoutInformation/:productId', (req, res) => {
  var id = req.params.productId
  axios.get(`http://localhost:5000/db/${id}`)
  .then((data) => {
    res.send(data.data)
  })
  .catch((error) => {
    var message = `could not get item with ${id} -> ${error}`
    res.send(message)
  })
});

app.listen(port, () => console.log('connected to server'));