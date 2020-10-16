function foo(opts) {
  var foo = opts.foo ?? 'abc';
  var fooExists = opts.foo && EXISTS;
}
