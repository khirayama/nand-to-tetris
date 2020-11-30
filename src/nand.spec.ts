import assert from 'power-assert';
import { nand } from './nand';

describe('Nand', function () {
  it('should return collect Binary', function () {
    assert.equal(nand(0, 0), 1);
    assert.equal(nand(0, 1), 1);
    assert.equal(nand(1, 0), 1);
    assert.equal(nand(1, 1), 0);
  });
});
