function ConvertHandler() {

  const regexNum = /^(\d*\.?\d*\/?\d*\.?\d*)([a-zA-Z]+)$/i;
  const regexUnit = /(lbs|gal|l|kg|mi|km)$/i;
  
  this.getNum = function(input) {
    let result;
    if (input.match(regexNum) === null) {
      result = 'invalid number'
    } else if (input.match(regexNum)[1] === '') {
      result = 1
    } else {
      result = input.match(regexNum)[1]
      if (result.includes('/')){
        let fullExp = result.split('/')
        result = parseFloat(fullExp[0] / fullExp[1])
      }
      result = parseFloat(result)
    }
      return result
  };
  
  this.getUnit = function(input) {
    let result = 'invalid unit';
    
    if (regexUnit.test(input)) {
      result = input.match(regexUnit)[0].toLowerCase();
      if (result === "l") result = 'L';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = 'invalid unit';
    
    if (initUnit === 'gal') result = 'L';
    if (initUnit === 'L') result = 'gal';
    if (initUnit === 'lbs') result = 'kg';
    if (initUnit === 'kg') result = 'lbs';
    if (initUnit === 'mi') result = 'km';
    if (initUnit === 'km') result = 'mi';
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = 'invalid unit';
    
    if (unit === 'gal') result = 'gallons';
    if (unit === 'L') result = 'liters';
    if (unit === 'lbs') result = 'pounds';
    if (unit === 'kg') result = 'kilograms';
    if (unit === 'mi') result = 'miles';
    if (unit === 'km') result = 'kilometers';

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal') result = initNum * galToL;
    if (initUnit === 'L') result = initNum / galToL;
    if (initUnit === 'lbs') result = initNum * lbsToKg;
    if (initUnit === 'kg') result = initNum / lbsToKg;
    if (initUnit === 'mi') result = initNum * miToKm;
    if (initUnit === 'km') result = initNum / miToKm;

    if (isNaN(result)) { 
      result = 'invalid number'
    } else {
      result = result.toFixed(5)
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
