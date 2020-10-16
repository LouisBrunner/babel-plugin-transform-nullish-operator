// Heavily inspired by https://github.com/babel/babel/blob/main/packages/babel-plugin-proposal-nullish-coalescing-operator/src/index.js
import {declare} from '@babel/helper-plugin-utils';
import {syntaxNullishCoalescingOperator} from '@babel/plugin-syntax-nullish-coalescing-operator';
import {types as t, template} from '@babel/core';

const createVisitor = (identifier) => {
  return {
    LogicalExpression(path) {
      const {node, scope} = path;
      if (node.operator !== '??' || !t.isIdentifier(node.right) || node.right.name !== identifier) {
        return;
      }

      let ref;
      let assignment;
      // skip creating extra reference when `left` is static
      if (scope.isStatic(node.left)) {
        ref = node.left;
        assignment = t.cloneNode(node.left);
      } else if (scope.path.isPattern()) {
        // Replace `function (a, x = a.b ?? c) {}` to `function (a, x = (() => a.b ?? c)() ){}`
        // so the temporary variable can be injected in correct scope
        path.replaceWith(template.ast`(() => ${path.node})()`);
        // The injected nullish expression will be queued and eventually transformed when visited
        return;
      } else {
        ref = scope.generateUidIdentifierBasedOnNode(node.left);
        scope.push({id: t.cloneNode(ref)});
        assignment = t.assignmentExpression('=', ref, node.left);
      }

      path.replaceWith(
        t.logicalExpression(
          '&&',
          t.binaryExpression('!==', assignment, t.nullLiteral()),
          t.binaryExpression('!==', t.cloneNode(ref), scope.buildUndefinedNode()),
        ),
      );
    },
  };
};

export default declare((api, {identifier = 'EXISTS'}) => {
  api.assertVersion(7);

  return {
    name: 'transform-nullish-operator',
    inherits: syntaxNullishCoalescingOperator,

    visitor: {
      // We could use `LogicalExpression` directly here, unfortunately,
      // `instanbul-lib-instrument` adds branch coverage collection using `Program.enter` when it gets loaded
      // and thus misunderstand `?? EXISTS` as an actual elvis operator,
      // so we need to compile it out ASAP!
      Program: {
        enter(path) {
          path.traverse(createVisitor(identifier));
        },
      },
    },
  };
});
