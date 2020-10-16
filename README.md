# `babel-plugin-transform-nullish-operator`

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

## References & Thanks

This is project is heavily based on Babel's [`@babel/plugin-proposal-nullish-coalescing-operator`](https://babeljs.io/docs/en/next/babel-plugin-proposal-nullish-coalescing-operator.html) (including code, tests, usage, etc).
