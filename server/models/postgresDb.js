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
  unavailableDates : {type: DataTypes.DECIMAL},
  monthlyDiscount:  {type: DataTypes.DECIMAL},
  weeklyDiscount:  {type: DataTypes.DECIMAL},
  newListingPromoDiscount:  {type: DataTypes.DECIMAL},
  priceForDate:  {type: DataTypes.DECIMAL},
  cleaningFee:  {type: DataTypes.SMALLINT},
  serviceFee: {type: DataTypes.SMALLINT},
  monthsInAdvance : {type: DataTypes.SMALLINT},
  daysNotice: {type: DataTypes.SMALLINT}
}, {
  freezeTableName: true
});

var LocationInfoInit = ( async() => {
  try {
    await LocationInfo.sync()
    console.log('LocationInfo initialized')
    var firstItemInDb = await getDataFromDbWithId(1)
    if (firstItemInDb.length === 0) {
      // seed db here
      seedDb()
    } else {
      console.log('firstItemInDb -> ', firstItemInDb)
    }
  } catch (error) {
    console.error('unable to initialize locationinfo', error);
  }
})()

var getDataFromDbWithId = async (id) => {
  try {
    var data = await LocationInfo.findAll({ where: {id: id}});
    console.log(`data for id ${id} -> `,data)
    return data
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

var insertIntoDb = async function() {
  var data = generateDataForLocation()
    try {
      await LocationInfo.create({
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

var generateDataArray = (amount) => {
  var storage = []
  for ( var i = 1; i <= amount; i++) {
    var data = generateDataForLocation()
    storage.push(data)
  }
  return storage
}
var createBulkData = async () => {
  var data = generateDataArray(5000)
  try {
    await LocationInfo.bulkCreate(data, { validate: true });
  } catch (error) {
    console.error('Unable to create bulk data', error);
  }
}
var seedDb = async () => {
  console.time('seedDB')
  for (var i = 0 ; i < 2000; i++) {
    await createBulkData()
  }
  console.timeEnd('seedDB')
}

module.exports = {insertIntoDb}










