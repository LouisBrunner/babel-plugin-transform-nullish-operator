# `babel-plugin-transform-nullish-operator` [![NPM Version][npm-image]][npm-url] ![Build Status][ci-image] [![Coverage Status][coveralls-image]][coveralls-url]

This package is a `babel` plugin which can be used to emulate the Coffeescript existence operator (`a?`) in Babel using the new [coalescing nullish operator](https://babeljs.io/docs/en/next/babel-plugin-proposal-nullish-coalescing-operator.html) ([Stage 4 proposal](https://github.com/tc39/proposal-nullish-coalescing)).

This is completely non-standard, experimental and could break at any time.

## Example

**In**

```javascript
var fooExists = object.foo ?? EXISTS;
```

**Out**

```javascript
var _object$foo;

var fooExists = (_object$foo = object.foo) !== null && _object$foo !== void 0;
```

> **NOTE:** We cannot use `!= null` here because `document.all == null` and
> `document.all` has been deemed not "nullish".

## Installation

```sh
npm install --save-dev babel-plugin-transform-nullish-operator
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["babel-plugin-transform-nullish-operator"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-transform-nullish-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["babel-plugin-transform-nullish-operator"]
});
```

## Options

### `identifier`

`string`, defaults to `EXISTS`.

Can be used to change the identifier which is used to trigger this alternative behavior of the nullish coalescing operator.

#### Example with `{"identifier": "DO_YOU_EXIST"}`

**In**

```javascript
var fooExists = object.foo ?? DO_YOU_EXIST;
```

**Out**

```javascript
var _object$foo;

var fooExists = (_object$foo = object.foo) !== null && _object$foo !== void 0;
```

## Linting

Your linter might `EXISTS` as undefined (which is true, the symbol doesn't actually exists, it is only a placeholder), in that case you will need to explicitely add it in your config.

Example using `eslint`:

```json
{
  ...
  "globals": {
    "EXISTS": "readonly"
  },
  ...
}
```

## References & Thanks

This is project is heavily based on Babel's [`@babel/plugin-proposal-nullish-coalescing-operator`](https://babeljs.io/docs/en/next/babel-plugin-proposal-nullish-coalescing-operator.html) (including code, tests, usage, etc).

## License

MIT, Copyright (c) 2020-2020 Louis Brunner



[npm-image]: https://img.shields.io/npm/v/babel-plugin-transform-nullish-operator.svg
[npm-url]: https://npmjs.org/package/babel-plugin-transform-nullish-operator
[ci-image]: https://github.com/LouisBrunner/babel-plugin-transform-nullish-operator/workflows/Build/badge.svg
[coveralls-image]: https://coveralls.io/repos/github/LouisBrunner/babel-plugin-transform-nullish-operator/badge.svg?branch=main
[coveralls-url]: https://coveralls.io/github/LouisBrunner/babel-plugin-transform-nullish-operator?branch=main
