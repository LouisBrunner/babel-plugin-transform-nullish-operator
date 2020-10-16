function foo(opts) {
  var fooExists = opts.foo ?? EXISTS;
  var foo = opts.foo ?? 'abc';
}
