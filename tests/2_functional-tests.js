const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert 10L to gal', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({input: '10L'})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L');
                assert.equal(res.body.returnUnit, 'gal');
                assert.approximately(res.body.returnNum, 2.64172, 0.1);
                done();
        });
    });

    test('Convert 32g to lbs', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({input: '32g'})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 32);
                assert.equal(res.body.initUnit, 'g');
                assert.equal(res.body.returnUnit, 'lbs');
                assert.approximately(res.body.returnNum, 0.0705479, 0.1);
                done();
        });
    });

    test('Convert 3/7.2/4kg to lbs', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kg'})
            .end(function (err, res) {
                assert.equal(res.status, 500);
                assert.isEmpty(res.body); 
                done();
        });
    });

    test('Convert 3/7.2/4kilomegagram to lbs', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kilomegagram'})
            .end(function (err, res) {
                assert.equal(res.status, 500);
                assert.isEmpty(res.body); 
                done();
        });
    });

    test('Convert kg to lbs', function (done) {
        chai
            .request(server)
            .get('/api/convert')
            .query({input: 'kg'})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                assert.equal(res.body.returnUnit, 'lbs');
                assert.approximately(res.body.returnNum, 2.20462, 0.1);
                done();
        });
    });

});
