// const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({
//   contactPoints: ['h1', 'h2'],
// });

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datastax-desktop', keyspace: 'checkoutcalender'});

    // const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datastax-desktop' });
// client.connect()
//   .then(function () {
//     console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
//     console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
//     // console.log('Shutting down');
//     // return client.shutdown();
//     // return client.execute('use locationid')
//   })
//   .catch(function (err) {
//     console.error('There was an error when connecting', err);
//     return client.shutdown().then(() => { throw err; });
//   })

  // var getLocationInfoWithId = (id) =>{
  //   // var querry = `SELECT * FROM locationInfo WHERE id = ${id}`
  //   var querry = `SELECT * FROM locationInfo WHERE id=1 ORDER BY id DESC LIMIT 5;
  //   `
  //   client.execute(querry)
  //   .then((data) => {
  //     console.log('data looks like ->', data)
  //     // console.log('data looks like ->', data[0])
  //     // return client.shu tdown();
  //   })
  //   .catch((err) => {
  //     console.error('There was an error when connecting', err);
  //     console.log('keyspace creatio err ->', err)
  //   });
  // }

  const getRandomInclusiveIntervals = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var generateDataForLocation = () => {
    const daysNoticeOptions = [0, 1, 2, 3, 7];
    const monthsInAdvanceOptions = [0, 3, 6, 9, 12];
    const cleaningFeeOptions = [0.15, 0.3];
    const serviceFeeOptions = [0.1, 0.2];

    let daysNoticeIndex = getRandomInclusiveIntervals(0, 4);
    let monthsInAdvanceIndex = getRandomInclusiveIntervals(0, 4);
    let priceForDate = Number.parseFloat(Math.random() * (300 - 75) + 75);

    priceForDate = priceForDate.toString().split('.');
    priceForDate[1] = (priceForDate[1].slice(0, 2));
    priceForDate = Number.parseFloat(priceForDate.join('.'));
    let cleaningFee = parseInt(Number.parseFloat(Math.random() * (cleaningFeeOptions[1] - cleaningFeeOptions[0]) + cleaningFeeOptions[0]).toPrecision(4));
    let serviceFee = parseInt(Number.parseFloat(Math.random() * (serviceFeeOptions[1] - serviceFeeOptions[0]) + serviceFeeOptions[0]).toPrecision(4));
    return {
      insertion_time: Date.now(),
      monthlyDiscount: 0.49,
      weeklyDiscount: 0.21,
      newListingPromoDiscount: 0.20,
      priceForDate: priceForDate,
      cleaningFee: cleaningFee,
      serviceFee: serviceFee,
      monthsInAdvance: monthsInAdvanceOptions[monthsInAdvanceIndex],
      daysNotice: daysNoticeOptions[daysNoticeIndex],
    }
  }

  // var insertIntoDbWithId = async function (i) {
  //   var data = generateDataForLocation()
  //   var query = `INSERT INTO locationinfo (insertion_time, id, monthlyDiscount, weeklyDiscount, newListingPromoDiscount, priceForDate, cleaningFee, serviceFee, monthsInAdvance, daysNotice) VALUES (${data.insertion_time}, ${i},${data.monthlyDiscount}, ${data.weeklyDiscount},${data.newListingPromoDiscount},${data.priceForDate}, ${data.cleaningFee},${data.serviceFee},${data.monthsInAdvance},${data.daysNotice});`
  //     try {
  //       let response = await client.execute(query)
  //       console.log('data inserted into db')
  //     } catch(err) {
  //       console.log('async error ->', err);
  //     }
  //   }

    var insertIntoDbWithId = (i) => {
      var data = generateDataForLocation()
      var query = `INSERT INTO locationinfo (insertion_time, id, monthlyDiscount, weeklyDiscount, newListingPromoDiscount, priceForDate, cleaningFee, serviceFee, monthsInAdvance, daysNotice) VALUES (${data.insertion_time}, ${i},${data.monthlyDiscount}, ${data.weeklyDiscount},${data.newListingPromoDiscount},${data.priceForDate}, ${data.cleaningFee},${data.serviceFee},${data.monthsInAdvance},${data.daysNotice});`
      return client.execute(query)

      }


  var seedDbWithAmount = (amount) => {
    console.time('db seed')
    for ( var i = 1; i <= amount; i++) {
      insertIntoDbWithId(i)
      .then((data) => {
        console.log('data looks like ->', data)
        // return client.shu tdown();
      })
      .catch((err) => {
        console.error('There was an error when connecting', err);
        console.log('keyspace creatio err ->', err)
      });
    }
    console.timeEnd('db seed')
  }

  // seedDbWithAmount(10000000)

  // client.execute(query)
  // .then((data) => {
  //   console.log('data looks like ->', data)
  //   // return client.shu tdown();
  // })
  // .catch((err) => {
  //   console.error('There was an error when connecting', err);
  //   console.log('keyspace creatio err ->', err)
  // });

  module.exports = {generateDataForLocation}

