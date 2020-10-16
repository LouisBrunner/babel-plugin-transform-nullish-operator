/* eslint-disable no-plusplus */
expect(null ?? EXISTS).toBe(false);
expect(undefined ?? EXISTS).toBe(false);
expect(false ?? EXISTS).toBe(true);
expect(0 ?? EXISTS).toBe(true);
expect('' ?? EXISTS).toBe(true);

const obj = {exists: true};
expect(obj.exists ?? EXISTS).toBe(true);
expect(obj.doesNotExist ?? EXISTS).toBe(false);

let counter = 0;
const sideEffect = () => {
  return counter++;
};
expect(sideEffect() ?? EXISTS).toBe(true);

let counter2 = 0;
const obj2 = {
  get foo() {
    return counter2++;
  },
};
expect(obj2.foo ?? EXISTS).toBe(true);
