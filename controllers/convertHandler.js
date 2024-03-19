const unitRegex = /[a-zA-Z]+$/;

function ConvertHandler() {

  this.getNum = function(input) {
    let result = input.replace(unitRegex, '').trim();
    result = result === '' ? 1 : +convertToFloat(result);
    return result;
  };
  
  this.getUnit = function(input) {
    input = input.trim();
    let result = input.match(unitRegex);
    const unitMapping = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'g': 'grams',
    };
    if(unitMapping.hasOwnProperty(result[0]) === false) {
      throw new Error('invalid unit');
    } else {
      result = result[0];
    }
  
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMapping = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs',
      'g': 'lbs',
    };
;
    if (unitMapping.hasOwnProperty(initUnit)) {
      result = unitMapping[initUnit];
    }
    return result
  };

  this.spellOutUnit = function(unit) {
    const unitMapping = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'g': 'grams',
    };
    if(unitMapping.hasOwnProperty(unit) === false) {
      throw new Error('invalid unit');
    } else {
      result = unitMapping[unit];
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    console.log("convert InitNum: " + initNum + " InitUnit: " + initUnit);
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    const unitLowerCase = initUnit;
    switch (unitLowerCase) {
      case "gal":
        console.log("convert gal");
        result = initNum * galToL;
        break;
      case "lbs":
        console.log("convert lbs");
        result = initNum * lbsToKg;
        break;
      case "mi":
        console.log("convert mi");
        result = initNum * miToKm;
        break;
      case "L":
        console.log("convert L");
        result = initNum / galToL;
        break;
      case "kg":
        console.log("convert kg");
        result = initNum / lbsToKg;
        break;
      case "km":
        console.log("convert km");
        result = initNum / miToKm;
        break;
      case "g":
        console.log("convert g");
        result = initNum / 1000 / lbsToKg;
        break;
      default:
        console.log("convert default");
        result = 0;
        break;
    }

    return result;
  };

function convertToFloat(input) {
    let result = input.replace(unitRegex, '').trim();

    if(result === '') {
      return 1;
    }
    if(result.toString().includes("/")) {
      let fraction = result.split("/");
      if(fraction.length != 2) {
        throw new Error('invalid number'); 
      } else {
        let firstNumber = Number.parseFloat(fraction[0]);
        let secondNumber = Number.parseFloat(fraction[1]);

        if(Number.isNaN(firstNumber) === false && Number.isNaN(secondNumber) === false) {
          result = eval(result);
        } else {
          throw new Error('invalid number');
        }
      }
    }

    if (result === null || result === undefined) {
      throw new Error('invalid number');
    }

    return result;
}
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const resString =  `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;  
    console.log("getString result: " + resString);
    return resString;
  };
}

module.exports = ConvertHandler;
