import test from 'ava';

const fn = () => 'foo';

test('fn() retunrs foo', t => {
  t.is(fn(), 'foo');
});
