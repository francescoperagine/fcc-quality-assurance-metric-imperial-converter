const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const invalidNumber = 'invalid number';
const invalidUnit = 'invalid unit';

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    describe('convertHandler', function () {
        it('convertHandler should correctly read a whole number input.', function () {
            const input = '3mi';
            const expectedNum = 3;
            const expectedUnit = 'mi';
            assert.strictEqual(convertHandler.getNum(input), expectedNum);
            assert.strictEqual(convertHandler.getUnit(input), expectedUnit);
        });

        it('should correctly read a decimal number input.', function () {
            const input = '3.5km';
            const expectedNum = 3.5;
            const expectedUnit = 'km';
            assert.strictEqual(convertHandler.getNum(input), expectedNum);
            assert.strictEqual(convertHandler.getUnit(input), expectedUnit);
        });

        it('should correctly read a fractional input.', function () {
            const input = '1/2gal';
            const expectedNum = 0.5;
            const expectedUnit = 'gal';
            assert.strictEqual(convertHandler.getNum(input), expectedNum);
            assert.strictEqual(convertHandler.getUnit(input), expectedUnit);
        });

        it('should correctly read a fractional input with a decimal.', function () {
            const input = '2.5/2km';
            const expectedNum = 1.25;
            const expectedUnit = 'km';
            assert.strictEqual(convertHandler.getNum(input), expectedNum);
            assert.strictEqual(convertHandler.getUnit(input), expectedUnit);
        });

        it('should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
            const input = '3/2/3';
            assert.deepEqual(convertHandler.getNum(input), invalidNumber);
        });

        it('should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
            const input = 'gal';
            const expected = 1;
            assert.strictEqual(convertHandler.getNum(input), expected);
        });

        it('should correctly read each valid input unit.', function () {
            const input = 'gal';
            const expected = 'gal';
            assert.deepEqual(convertHandler.getUnit(input), expected);
        });

        it('should correctly throw an error for an invalid input unit.', function () {
            const input = 'gala';
            assert.deepEqual(convertHandler.getUnit(input), invalidUnit);
        });

        it('should return the correct return unit for each valid input unit.', function () {
            const input = 'gal';
            const expected = 'L';
            assert.strictEqual(convertHandler.getReturnUnit(input), expected);
        });

        it('should correctly return the spelled-out string unit for each valid input unit.', function () {
            const input = 'gal';
            const expected = 'gallons';
            assert.strictEqual(convertHandler.spellOutUnit(input), expected);
        });

        it('should correctly convert gal to L.', function () {
            const input = '3.78541gal';
            const expected = 3.78541;
            assert.approximately(convertHandler.convert(1, 'gal'), expected, 0.1);
        });

        it('should correctly convert L to gal.', function () {
            const input = '3.78541l';
            const expected = 1;
            assert.approximately(convertHandler.convert(3.78541, 'L'), expected, 0.1);
        });

        it('should correctly convert mi to km.', function () {
            const input = '1.60934mi';
            const expected = 1.60934;
            assert.approximately(convertHandler.convert(1, 'mi'), expected, 0.1);
        });

        it('should correctly convert km to mi.', function () {
            const input = '1.60934km';
            const expected = 1;
            assert.approximately(convertHandler.convert(1.60934, 'km'), expected, 0.1);
        });

        it('should correctly convert lbs to kg.', function () {
            const input = '0.453592lbs';
            const expected = 0.453592;
            assert.approximately(convertHandler.convert(1, 'lbs'), expected, 0.1);
        });

        it('should correctly convert kg to lbs.', function () {
            const input = '0.453592kg';
            const expected = 1;
            assert.approximately(convertHandler.convert(0.453592, 'kg'), expected, 0.1);
        });
        
    });

});