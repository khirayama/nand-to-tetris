import assert from 'power-assert';
import { Word, Binary3 } from './types';
import { b } from './helpers';
import { RAM8 } from './RAM8';

describe('RAM8', function () {
  it('should return correct Binary', function () {
    const ram8 = new RAM8();

    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0001'), 0, b<Binary3>('000')), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0001'), 1, b<Binary3>('000')), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0000'), 1, b<Binary3>('000')), b<Word>('0000 0000 0000 0001'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0000'), 0, b<Binary3>('000')), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0001'), 1, b<Binary3>('000')), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0010'), 1, b<Binary3>('001')), b<Word>('0000 0000 0000 0000'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0010'), 0, b<Binary3>('001')), b<Word>('0000 0000 0000 0010'));
    assert.deepEqual(ram8.write(b<Word>('0000 0000 0000 0010'), 0, b<Binary3>('000')), b<Word>('0000 0000 0000 0001'));
  });
});
