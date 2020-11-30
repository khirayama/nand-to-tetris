import assert from 'power-assert';
import { mux } from './mux';

describe('Mux', function () {
  it('should return collect Binary', function () {
    assert.equal(mux(0, 0, 0), 0);
    assert.equal(mux(0, 1, 0), 0);
    assert.equal(mux(1, 0, 0), 1);
    assert.equal(mux(1, 1, 0), 1);
    assert.equal(mux(0, 0, 1), 0);
    assert.equal(mux(0, 1, 1), 1);
    assert.equal(mux(1, 0, 1), 0);
    assert.equal(mux(1, 1, 1), 1);
  });
});
