export function zero<T>(len: number = 16): T {
  const result = [];
  for (let i = 0; i < len; i += 1) {
    result.push(0);
  }
  return (result as unknown) as T;
}

export function b<T>(str: string): T {
  return (str
    .replace(/ /g, '')
    .split('')
    .map((n) => Number(n)) as unknown) as T;
}
