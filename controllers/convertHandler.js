const unitRegex = /[a-zA-Z]+$/;
const doubleDivision = /\/.*\//;
const invalidNumber = 'invalid number';
const invalidUnit = 'invalid unit';

const unitReturnMapping = {
  'gal': 'L',
  'L': 'gal',
  'mi': 'km',
  'km': 'mi',
  'lbs': 'kg',
  'kg': 'lbs',
  'g': 'lbs',
};

const unitSpellOutMapping = {
  'gal': 'gallons',
  'L': 'L',
  'mi': 'miles',
  'km': 'kilometers',
  'lbs': 'pounds',
  'kg': 'kilograms',
  'g': 'grams',
};

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

function ConvertHandler() {

  this.getNum = function(input) {
    let result = input.replace(unitRegex, '').trim();
    if (result === '') {
      result = 1;
    } else if (input.match(doubleDivision)) {
      result = invalidNumber;
    } else {
      result = +convertToFloat(result);
    }
    return result;
  };
  
  this.getUnit = function(input) {
    input = input.trim();
    let match = input.match(unitRegex);
    let result = match[0];
    result = result.toLowerCase();

    if(result === "l") {
      result = "L";
    }
    
    if(!unitReturnMapping.hasOwnProperty(result)) {
      result = invalidUnit;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    return unitReturnMapping[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return unitSpellOutMapping[unit];

  };
    this.convert = function(initNum, initUnit) {
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "g":
        result = initNum / 1000 / lbsToKg;
        break;
      default:
        result = 0;
        break;
    }

    return Math.round(result * 100000) / 100000;
  };

function convertToFloat(input) {
    let result = input.replace(unitRegex, '').trim();

    if(result === '') {
      return 1;
    }
    if(result.toString().includes("/")) {
      let fraction = result.split("/");
      if(fraction.length != 2) {
        result = invalidNumber;
      } else {
        let firstNumber = Number.parseFloat(fraction[0]);
        let secondNumber = Number.parseFloat(fraction[1]);

        if(Number.isNaN(firstNumber) === false && Number.isNaN(secondNumber) === false) {
          result = eval(result);
        } else {
          result = invalidNumber;
        }
      }
    }

    if (result === null || result === undefined) {
      return invalidNumber;
    }

    return result;
}
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    spelloutInitUnit = this.spellOutUnit(initUnit);
    spellOutResUnit = this.spellOutUnit(returnUnit);
    if(initNum <= 1 && initUnit !== "L") {
      spelloutInitUnit = spelloutInitUnit.slice(0, -1);
    }
    return `${initNum} ${spelloutInitUnit} converts to ${returnNum} ${spellOutResUnit}`;
  };
}

module.exports = ConvertHandler;
