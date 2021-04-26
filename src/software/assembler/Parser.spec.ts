import assert from 'power-assert';
import { Parser } from './Parser';

describe('Parser', function () {
  it('hasMoreCommands', function () {
    let parser = new Parser(['', '']);
    assert.equal(parser.hasMoreCommands(), true);
    parser = new Parser([]);
    assert.equal(parser.hasMoreCommands(), false);
  });
  it('advance', function () {});
  it('symbol', function () {});
  it('dest', function () {});
  it('comp', function () {});
  it('jump', function () {});
});
