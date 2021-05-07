const { Sequelize, DataTypes } = require('sequelize');
var {generateDataForLocation} = require('./cassandraDb.js')

const sequelize = new Sequelize('checkoutcalender', 'postgres', 'Cl1pClop1@', {
  host: 'localhost',
  dialect: 'postgres'
});

var connect = (async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

const LocationInfo = sequelize.define('locationinfo', {
  // Model attributes are defined here
  unavailableDates : 'decimal',
  monthlyDiscount: 'decimal',
  weeklyDiscount: 'decimal',
  newListingPromoDiscount: 'decimal',
  priceForDate: 'decimal',
  cleaningFee: 'smallint',
  serviceFee: 'smallint',
  monthsInAdvance : 'smallint',
  daysNotice: 'smallint'
});

// LocaionInfo.sync();


var insertIntoDb = async function() {
  var data = generateDataForLocation()
    try {
      await LocaionInfo.create({
        unavailableDates : data.unavailableDates,
        monthlyDiscount: data.monthlyDiscount,
        weeklyDiscount: data.weeklyDiscount,
        newListingPromoDiscount: data.newListingPromoDiscount,
        priceForDate: data.priceForDate,
        cleaningFee: data.cleaningFee,
        serviceFee: data.serviceFee,
        monthsInAdvance : data.monthsInAdvance,
        daysNotice: data.daysNotice
        })
    } catch (error) {
      console.log('db save error -> ', err)
    }
}


// var checkDb = ( async () => {
//   LocaionInfo.findAll({})
//   .then((data) => {
//     console.log('data in db -> ', data)
//   })
//   .catch((err) => {
//     console.log('coudld not fetch data -> ', err)
//   })
// })()

var getDataFromDbWithId = (id) => {
  return LocaionInfo.findAll({
      where: {
        id: id
      }
    });
}

var seedDbWithAmount = (amount) => {
  console.time('DbSeedTime')
  for (var i = 0; i < amount; i++) {
    insertIntoDb()
  }
  console.timeEnd('DbSeedTime')
}

seedDbWithAmount(10000000)
// getDataFromDbWithId(1)
// .then((data) => {
//   console.log(`data for id`, data)
// })
// .catch((err) => {
//   console.log(`error getting data for id -> `, err)
// })


// Post.findAll({
//   where: {
//     authorId: 2
//   }
// });


// insertIntoDb()





module.exports = {insertIntoDb}










