'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');
const invalidNumber = 'invalid number';
const invalidUnit = 'invalid unit';
const invalidNumberAndUnit = 'invalid number and unit';

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res) {
      let result;
      let input = req.query.input;
      let reqNum = convertHandler.getNum(input);
      let reqUnit = convertHandler.getUnit(input);

      if(reqNum == invalidNumber && reqUnit == invalidUnit) {
        result = { error: invalidNumberAndUnit };
        return res.json(result);
      } 
      if(reqNum == invalidNumber) {
        result = { error: invalidNumber };
        return res.json({ error: invalidNumber });
      }
      if(reqUnit == invalidUnit) {
        result = { error: invalidUnit };
        return res.json(result);
      }
      let resUnit = convertHandler.getReturnUnit(reqUnit);
      let resNum = convertHandler.convert(reqNum, reqUnit);
      let resString = convertHandler.getString(reqNum, reqUnit, resNum, resUnit);
      result = {initNum: reqNum, initUnit: reqUnit, returnNum: resNum, returnUnit: resUnit, string: resString};
      return res.json(result);
    });

};
