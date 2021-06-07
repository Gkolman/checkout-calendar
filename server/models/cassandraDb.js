// const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({
//   contactPoints: ['h1', 'h2'],
// });

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datastax-desktop', keyspace: 'checkoutcalender'});


const {performance} = require('perf_hooks');
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
var fs = require('fs')

var {generateDataForLocation} = require('./dataGenerationScript.js')

// client.connect()
//   .then(function () {
//     console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
//     console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
//     // console.log('Shutting down');
//     // return client.shutdown();
//     // return client.execute('use locationid')
//   })
//   .catch(function (err) {
//     console.error('There was an error when connecting ->', err);
//     return client.shutdown().then(() => { throw err; });
//   })

var initCsvFile = async () => {
  console.log('initializing csv...')
  var time = Date.now()
  writer.pipe(fs.createWriteStream('out.csv'))
  console.time('initCsvFile')
  for (var i = 0; i < 10000000; i++) {
    var data = generateDataForLocation()
    writer.write({
        id: i,
        cleaningfee: data.cleaningFee,
        daysnotice: data.daysNotice,
        monthlydiscount: data.monthlyDiscount,
        monthsinadvance: data.monthsInAdvance,
        newlistingpromodiscount: data.newListingPromoDiscount,
        pricefordate: data.priceForDate,
        servicefee: data.serviceFee,
        unavailabledates: data.unavailableDates,
        weeklydiscount: data.weeklyDiscount
    })
    try {
      await new Promise(resolve => setImmediate(resolve))
    } catch (err) {
      console.log(err);
    }
  }
    console.timeEnd('initCsvFile')
  writer.end()
}//

  var getDataFromCassandraWithId = async (id) => {
    var querry = `SELECT * FROM locationInfo WHERE id=${id} ALLOW FILTERING;`
    try {
      var data = await client.execute(querry)
      console.log(`data for id ${id} -> `, data.rows)
      return data
    } catch (error) {
      console.log(`could not get data for id ${id} -> `, error)
    }
  }

  getDataFromCassandraWithId(1)

  var initCassandraDb = (async () => {
    try {
      var data = await getDataFromCassandraWithId(1)
      console.log('data in db init -> ', data)
    } catch (error) {
      console.log(`problem initializing db -> `, error)
    }
  })

  // var getDataFromCassandra = (async () => {
  //   // var querry = `SELECT * FROM locationInfo WHERE id = ${id}`
  //   var querry = `select * from locationinfo where id = 20 allow filtering;`
  //   try {
  //     var data = await client.execute(querry)
  //     // console.log(`data from cassandra  -> `, data)
  //     for ( var row of data.rows) {
  //       console.log(' row id ->', row.id)
  //     }
  //   } catch (error) {
  //     console.log(`could not get data for id -> `, error)
  //   }
  // })()

  var getLastInsertedId = async () => {
    var query = `select * from locationinfo limit 1;`
    try {
      var lastRecordInDb = await client.execute(query)
      console.log('last record -> ',lastRecordInDb.rows[0].id.low)
      return lastRecordInDb
    } catch (error) {
      console.log(`could not insert item into db -> `, error)
    }
  }
  var insertIntoDb = async () => {
    try {
      var lastRecordInDb = await getLastInsertedId()
      var lastIdInDb = lastRecordInDb.rows[0].id.low
      console.log('right here ->', lastIdInDb)
      await insertIntoDbWithId(lastIdInDb +1 )
      .then(() => {
        console.log(`data inserted into db`)
      })
      .catch(() => {
        console.log(`error inserting into db -> `, error)
      })
    } catch (error) {
      console.log(`could not insert item into db -> `, error)
    }
  }
  var insertIntoDbWithId = async (id) => {
    var data = generateDataForLocation()
    var query = `INSERT INTO locationinfo (id, cleaningfee, daysNotice, monthlydiscount, monthsinadvance, newListingPromoDiscount,  pricefordate, serviceFee, unavailabledates, weeklyDiscount) VALUES (${id},${data.cleaningFee}, ${data.daysNotice},${data.monthlyDiscount},${data.monthsInAdvance}, ${data.newListingPromoDiscount},${data.priceForDate},${data.serviceFee},null, ${data.weeklyDiscount});`
    try {
      await client.execute(query)
    } catch(err) {
      console.log('error inserting item into db -> ', err)
    }
  }
    // insertIntoDb()

var seedDbWithAmount = async (amount) => {
  console.time('db seed')
  for ( var i = 1; i <= amount; i++) {
    await insertIntoDbWithId(i)
    .then((data) => {
      // console.log('data looks like ->', data)
      // return client.shu tdown();
    })
    .catch((err) => {
      console.error('There was an error when connecting', err);
      console.log('keyspace creatio err ->', err)
    });
  }
  console.timeEnd('db seed')
}

var test50000GetRecords = async () => {
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  var queryTimes = []
  for (var i = 0; i < 50000; i++) {
    var start = performance.now();
    var randomId = getRandomNumber(0,10000000)
    try {
      await getDataFromCassandraWithId(randomId)
      var end = performance.now();
      var time = end - start;
      queryTimes.push(time)
    } catch(err) {
      console.log('error getting data -> ', err)
    }
  }
  const totalTime = queryTimes.reduce((accumulator, element) => {
    return accumulator + element;
  }, 0);
  var averageTime = totalTime / queryTimes.length
  console.log('average time -> ', averageTime)
}

var updateIdWithData = async (id,data) => {
  const query = `UPDATE locationinfo SET
  cleaningfee = ${data.cleaningFee},
  daysnotice = ${data.daysNotice},
  monthlydiscount = ${data.monthlyDiscount},
  monthsinadvance = ${data.monthsInAdvance},
  newlistingpromodiscount = ${data.newListingPromoDiscount},
  pricefordate = ${data.priceForDate},
  servicefee = ${data.serviceFee},
  weeklydiscount = ${data.weeklyDiscount}
  WHERE id = ${id};`
  try {
    await client.execute(query)
  } catch(err) {
    console.log('err ->', err)
  }
}

const test50000UpdateQueries = async () => {
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  var queryTimes = []
  for (var i = 0; i < 50000; i++) {
    var start = performance.now();
    var randomId = getRandomNumber(0,10000000)
    try {
      console.log('randomId id right here ->', randomId)
      await updateIdWithData(randomId,generateDataForLocation())
      var end = performance.now();
      var time = end - start;
      queryTimes.push(time)
      // console.log('time -> ', time)
    } catch(err) {
      console.log('error getting data -> ', err)
    }
  }
  const totalTime = queryTimes.reduce((accumulator, element) => {
    return accumulator + element;
  }, 0);
  var averageTime = totalTime / queryTimes.length
  console.log('average time -> ', averageTime)
}

var deleteDataWithId = async (id) => {
  var query = `DELETE FROM locationinfo WHERE id=${id};`
  try {
    await client.execute(query)
    console.log('record deleted')
  } catch(err) {
    console.log('error deleting record')
  }
}
var test5000DeleteQueries = async () => {
  var queryTimes = []
  for (var i = 1; i <= 50000; i++) {
    var start = performance.now();
    try {
      await deleteDataWithId(i)
      var end = performance.now();
      var time = end - start;
      queryTimes.push(time)
    } catch(err) {
      console.log('error getting data -> ', err)
    }
  }
  const totalTime = queryTimes.reduce((accumulator, element) => {
    return accumulator + element;
  }, 0);
  var averageTime = totalTime / queryTimes.length
  console.log('average time -> ', averageTime)
}

// var putDataBack =  async () => {
//   for (var i = 1; i <= 50000;i++) {
//     try {
//       await insertIntoDbWithId(i)
//     } catch(err) {
//       console.log('error adding data ')
//     }
//   }
// }



// getDataFromCassandraWithId(1)
// deleteDataWithId(1)

// insertIntoDbWithId(1)

// var getLastInsertedId = async () => {
//   var query = `select * from locationinfo limit 1;`
//   try {
//     var lastRecordInDb = await client.execute(query)
//     console.log('last record -> ',lastRecordInDb.rows[0].id.low)
//     return lastRecordInDb
//   } catch (error) {
//     console.log(`could not insert item into db -> `, error)
//   }
// }
// var insertIntoDb = async () => {
//   try {
//     var lastRecordInDb = await getLastInsertedId()
//     var lastIdInDb = lastRecordInDb.rows[0].id.low
//     console.log('right here ->', lastIdInDb)
//     await insertIntoDbWithId(lastIdInDb +1 )
//     .then(() => {
//       console.log(`data inserted into db`)
//     })
//     .catch(() => {
//       console.log(`error inserting into db -> `, error)
//     })
//   } catch (error) {
//     console.log(`could not insert item into db -> `, error)
//   }
// }


  module.exports = {generateDataForLocation}

