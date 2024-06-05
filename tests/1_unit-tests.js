const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // TEST 01
    test('convertHandler should correctly read a whole number input.', (done) => {
        let input = '32L';
        assert.equal(convertHandler.getNum(input), 32);
        assert.isNumber(convertHandler.getNum(input));
        done();
    });
    // TEST 02
    test('convertHandler should correctly read a decimal number input.', (done) => {
        let input = '3.2L';
        assert.equal(convertHandler.getNum(input), 3.2);
        assert.isNumber(convertHandler.getNum(input));
        done();
    });
    // TEST 03
    test('convertHandler should correctly read a fractional input.', (done) => {
        let input = '1/4L';
        assert.equal(convertHandler.getNum(input), 0.25);
        assert.isNumber(convertHandler.getNum(input));
        done();
    });
    // TEST 04
    test('convertHandler should correctly read a fractional input with a decimal.', (done) => {
        assert.equal(convertHandler.getNum('1.2/2l'), 0.6);
        assert.equal(convertHandler.getNum('2.4/1.2l'), 2);
        assert.equal(convertHandler.getNum('12.25/1.75km'), 7);
        assert.equal(convertHandler.getNum('12.25/1.75km'), 7);
        assert.equal(convertHandler.getNum('4.6/2.8km'), 1.6428571428571428);
        done();
    });
    // TEST 05
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', (done) => {
        let input = '3/2/3L';
        assert.equal(convertHandler.getNum(input), 'invalid number');
        done();
    });
    // TEST 06
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', (done) => {
        let input = 'L';
        assert.equal(convertHandler.getNum(input), 1);
        assert.isNumber(convertHandler.getNum(input));
        done();
    });
    // TEST 07
    test('convertHandler should correctly read each valid input unit.', (done) => {
        assert.equal(convertHandler.getUnit('1gal'), 'gal');
        assert.equal(convertHandler.getUnit('1l'), 'L');
        assert.equal(convertHandler.getUnit('1lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('1kg'), 'kg');
        assert.equal(convertHandler.getUnit('1mi'), 'mi');
        assert.equal(convertHandler.getUnit('1km'), 'km');
        done();
    });
    // TEST 08
    test('convertHandler should correctly return an error for an invalid input unit.', (done) => {
        assert.equal(convertHandler.getUnit('1fpsdoi'), 'invalid unit');
        assert.equal(convertHandler.getUnit('1ga'), 'invalid unit');
        done();
    });
    // TEST 09
    test('convertHandler should return the correct return unit for each valid input unit.', (done) => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        done();
    });
    // spellOutUnit function
    // TEST 10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', (done) => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        done();
    });
    // getReturnUnit function
    // TEST 11
    test('convertHandler should correctly convert gal to L.', (done) => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        done();
    });
    // TEST 12
    test('convertHandler should correctly convert L to gal.', (done) => {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        done();
    });
    // TEST 13
    test('convertHandler should correctly convert mi to km.', (done) => {
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        done();
    });
    // TEST 14
    test('convertHandler should correctly convert km to mi.', (done) => {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        done();
    });
    // TEST 15
    test('convertHandler should correctly convert lbs to kg.', (done) => {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        done();
    });
    // TEST 16
    test('convertHandler should correctly convert kg to lbs.', (done) => {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        done();
    });
});