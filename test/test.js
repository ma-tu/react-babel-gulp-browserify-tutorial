import assert from 'power-assert';

describe('ES6 Test', () => {
    it('Allow Function', () => {
        assert("a" + "b" === "ab");
    });
    it('Separate Operator', () => {
        const ary = [1,2,3]
        assert([0,...ary,4].length === 5);
    });
    it('mocha async', function(done) {
       setTimeout(function() {
         assert.ok(true);
         done();
       }, 1000);
     });
     it('mocha next', () => {
         assert(true);
     });
     before(function(done) {
       //console.log("before");
       done();
     });
     after(function(done) {
       //console.log("after");
       done();
     });
     beforeEach(function(done) {
       //console.log("beforeEach");
       done();
     });
     afterEach(function(done) {
       //console.log("afterEach");
       done();
     });
});
