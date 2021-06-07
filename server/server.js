const express = require('express');
const path = require('path');
const { getListingCheckoutInformation, updateListingInformation,deleteListingInformation, addListingInformation} = require('./models/Checkout');
const app = express();
var port = 3000
var {generateDataForLocation} = require('./models/dataGenerationScript.js')

app.use('/:productId', express.static(path.join(__dirname, '../public')));

var {insertIntoDb, getDataFromDbWithId,updateIdWithData, deleteDataWithId} = require('./models/postgresDb.js')
// var cassandraDb = require('./models/cassandraDb.js')
var postgresDb = require('./models/postgresDb.js')

var axios = require('axios');

var newRelic = require('newrelic');

app.get('/db/:id', (req, res) => {
    var id = req.params.id;
    console.log('id -> ',id )
    console.log('id -> ', typeof(id) )

    getDataFromDbWithId(id)
    .then((data) => {
      console.log('data from get request -> ', data)
      res.send(data)
    })
    .catch((error) => {
      console.log('db: error from get request -> ', error)
      res.end()
    })
  // var id = req.params.id;
  // getListingCheckoutInformation(id)
  // .then((data) => {
  //   console.log('data ->', data)
  //   var data = `listing data for id  -> , ${id}`
  //   res.send(data)
  // })
  // .catch((err) => {
  //   console.log(`get listing error -> `, err)
  //   res.send(`get listing error -> `, err)
  // })
})

app.get('/testDb', (req, res) => {
  var randomNum = (min, max) => { return Math.floor(Math.random() * (max - min)) + min}
  var id = randomNum(1,10000000)
  getDataFromDbWithId(1)
  .then((data) => {
    console.log('data from get request -> ', data)
    res.send(data)
  })
  .catch((error) => {
    console.log('db: error from get request -> ', error)
    res.end()
  })
})
app.post('/testDb', (req, res) => {
  insertIntoDb()
  .then((data) => {
    console.log('data created successfuly in post request -> ')
    res.send(data)
  })
  .catch((error) => {
    console.log('post request for create data failed -> ', error)
    res.end()
  })
})
app.put('/testDb', (req, res) => {
  var randomNum = (min, max) => { return Math.floor(Math.random() * (max - min)) + min}
  var id = randomNum(1,10000000)
  updateIdWithData(id,generateDataForLocation())
  .then((data) => {
    console.log('data updated scuccessfuly in put request')
    res.end()
  })
  .catch((error) => {
    console.log('put request failed -> ', error)
    res.end()
  })
})
// CONFIGURE DELETE TO DELETE LAST RECORD FIRST

// app.delete('/testDb', (req, res) => {
//   updateIdWithData(i,generateDataForLocation())
//   .then((data) => {
//     console.log('data created successfuly in post request -> ')
//     res.send(data)
//   })
//   .catch((error) => {
//     console.log('post request for create data failed -> ', error)
//     res.end()
//   })
// })

// get db

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
  // send new data here
  var id = req.params.productId
  getDataFromDbWithId(id)
  .then((data) => {
    data = data[0].dataValues
    data.listingId = data.id
    console.log('data from get request -> ', data)
    res.send(data)
  })
  .catch((error) => {
    console.log('db: error from get request -> ', error)
    // res.end()
  })

  // getListingCheckoutInformation(req.params.productId)
  //   .then((response) => {
  //     console.log('data being sent -> ', response[0])
  //     res.send(response[0])
  //   })
  //   .catch(err => console.log(`error looking for checkout information ${err}`));
});

app.listen(port, () => console.log('connected to server'));