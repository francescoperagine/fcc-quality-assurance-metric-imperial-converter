'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res) {
      let input = req.query.input;
      let reqNum = convertHandler.getNum(input);
      let reqUnit = convertHandler.getUnit(input);
      let resUnit = convertHandler.getReturnUnit(reqUnit);
      let resNum = convertHandler.convert(reqNum, reqUnit);
      let resString = convertHandler.getString(reqNum, reqUnit, resNum, resUnit);
      let result = {initNum: reqNum, initUnit: reqUnit, returnNum: resNum, returnUnit: resUnit, string: resString};
      res.json(result);
      return;
    });

};
