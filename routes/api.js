'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');


module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    let finalRes;
    // Get the user param
    let input = req.query.input;
    // split the user params (number and unit => 1 km)
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      finalRes = 'invalid number and unit';
    } else if (initNum === 'invalid number' && initUnit !== 'invalid unit'){
      finalRes = 'invalid number';
    } else if (initNum !== 'invalid number' && initUnit === 'invalid unit'){
      finalRes = 'invalid unit';
    } else {
      // check wich unit to convert to
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      // format the final string
      let finalString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      finalRes = {initNum: Number(initNum),initUnit,returnNum: Number(returnNum),returnUnit, string: finalString}
    }
    res.json(finalRes)
  })
};