import assert from 'power-assert';
import { Register } from './Register';

describe('Register', function () {
  it('should return collect Binary', function () {
    const register = new Register();
    assert.deepEqual(register.write([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 0), [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
    assert.deepEqual(register.write([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 1), [
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
    ]);
    assert.deepEqual(register.write([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0), [
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
    ]);
  });
});
