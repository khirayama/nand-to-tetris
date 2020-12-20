import assert from 'power-assert';
import { Nand } from './Nand';

describe('Nand', function () {
  it('should return correct Binary', function () {
    assert.equal(Nand(0, 0), 1);
    assert.equal(Nand(0, 1), 1);
    assert.equal(Nand(1, 0), 1);
    assert.equal(Nand(1, 1), 0);
  });
});
