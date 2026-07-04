import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test4: Module = {
  id: 'test-4',
  slug: 'test-4',
  title: 'Module 4 Test — Stacks & Queues',
  description:
    'Transfer-level practice: postfix evaluation, bracket validation, and queue-based task simulation.',
  icon: '📝',
  color: 'from-orange-500 to-amber-400',
  locked: true,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't4-q1',
      'Implement `eval_postfix(tokens)` evaluating **postfix** (Reverse Polish) expressions.\n\n`tokens` is a list of strings: operands are integers (`"2"`, `"-1"`), operators are `"+"`, `"-"`, `"*"`, `"/"` (integer division `//`).\n\nUse a stack: push operands; on an operator, pop two values, apply, push result. Return the final stack value.\n\nExample: `["2", "3", "+"]` → `5`; `["4", "2", "/"]` → `2`.',
      `def eval_postfix(tokens):
    pass
`,
      'function',
      funcCases(
        'eval_postfix',
        [
          { id: 's1', description: '2 3 +', args: [['2', '3', '+']], expectedReturn: 5 },
          { id: 's2', description: '4 2 /', args: [['4', '2', '/']], expectedReturn: 2 },
        ],
        [
          { id: 'h1', args: [['5', '1', '2', '+', '4', '*', '+', '3', '-']], expectedReturn: 14 },
          { id: 'h2', args: [['8']], expectedReturn: 8 },
          { id: 'h3', args: [['3', '4', '*']], expectedReturn: 12 },
          { id: 'h4', args: [['10', '3', '-']], expectedReturn: 7 },
        ]
      ),
      ms(
        `def eval_postfix(tokens):
    stack = []
    for tok in tokens:
        if tok in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if tok == "+":
                stack.append(a + b)
            elif tok == "-":
                stack.append(a - b)
            elif tok == "*":
                stack.append(a * b)
            else:
                stack.append(a // b)
        else:
            stack.append(int(tok))
    return stack[-1]`,
        'Postfix eliminates parentheses: operands stay on the stack until an operator combines the top two. Pop order matters for non-commutative ops (a - b, a // b).'
      )
    ),

    cr(
      't4-q2',
      'Implement `validate_brackets(s)` returning `True` when brackets are balanced and properly nested. Support `()`, `[]`, and `{}`.\n\nExample: `"({[]})"` → `True`; `"([)]"` → `False`.',
      `def validate_brackets(s):
    pass
`,
      'function',
      funcCases(
        'validate_brackets',
        [
          { id: 's1', description: 'Nested mixed', args: ['({[]})'], expectedReturn: true },
          { id: 's2', description: 'Crossed pairs', args: ['([)]'], expectedReturn: false },
        ],
        [
          { id: 'h1', args: [''], expectedReturn: true },
          { id: 'h2', args: ['()[]{}'], expectedReturn: true },
          { id: 'h3', args: ['((('], expectedReturn: false },
          { id: 'h4', args: ['{[()]}'], expectedReturn: true },
          { id: 'h5', args: [')('], expectedReturn: false },
        ]
      ),
      ms(
        `def validate_brackets(s):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in ")]}":
            if not stack or stack.pop() != pairs[ch]:
                return False
    return len(stack) == 0`,
        'Push opening brackets; on a closer, the stack top must be its partner. Empty stack on close or leftover opens after the scan both mean invalid.'
      )
    ),

    cr(
      't4-q3',
      'Simulate a **FIFO service queue** with `simulate_service_queue(ops)`.\n\nEach op is a list:\n- `["join", name]` — enqueue `name`\n- `["serve"]` — dequeue front (append to results); if empty append `null`\n- `["size"]` — append current queue length\n\nReturn the results list in order.',
      `def simulate_service_queue(ops):
    pass
`,
      'function',
      funcCases(
        'simulate_service_queue',
        [
          {
            id: 's1',
            description: 'Join and serve',
            args: [[['join', 'A'], ['join', 'B'], ['serve'], ['serve']]],
            expectedReturn: ['A', 'B'],
          },
        ],
        [
          {
            id: 'h2',
            args: [[['serve'], ['join', 'X'], ['size'], ['serve']]],
            expectedReturn: [null, 1, 'X'],
          },
          {
            id: 'h3',
            args: [[['join', '1'], ['join', '2'], ['size'], ['serve'], ['size']]],
            expectedReturn: [2, '1', 1],
          },
        ]
      ),
      ms(
        `def simulate_service_queue(ops):
    q = []
    results = []
    for op in ops:
        kind = op[0]
        if kind == "join":
            q.append(op[1])
        elif kind == "serve":
            results.append(q.pop(0) if q else None)
        elif kind == "size":
            results.append(len(q))
    return results`,
        'A list with pop(0) models FIFO (dequeue is O(n) but fine for learning). Real queues use head/tail pointers or collections.deque for O(1) dequeue.'
      )
    ),

    cr(
      't4-q4',
      'Implement `stack_evaluate(ops)` using a list as a stack. Operations:\n- `["push", x]` — push integer `x`\n- `["pop"]` — pop and append to results (or `null` if empty)\n- `["sum_top2"]` — pop two values, push their sum (if fewer than two, push `0`)\n\nReturn the results list.',
      `def stack_evaluate(ops):
    pass
`,
      'function',
      funcCases(
        'stack_evaluate',
        [
          {
            id: 's1',
            description: 'Push pop',
            args: [[['push', 1], ['push', 2], ['pop']]],
            expectedReturn: [2],
          },
        ],
        [
          {
            id: 'h1',
            args: [[['push', 3], ['push', 4], ['sum_top2'], ['pop']]],
            expectedReturn: [7],
          },
          {
            id: 'h2',
            args: [[['pop'], ['sum_top2']]],
            expectedReturn: [null, 0],
          },
        ]
      ),
      ms(
        `def stack_evaluate(ops):
    st = []
    results = []
    for op in ops:
        kind = op[0]
        if kind == "push":
            st.append(op[1])
        elif kind == "pop":
            results.append(st.pop() if st else None)
        elif kind == "sum_top2":
            if len(st) < 2:
                st.append(0)
            else:
                b = st.pop()
                a = st.pop()
                st.append(a + b)
    return results`,
        'Custom stack ops show LIFO: the last pushed value is popped first. sum_top2 mutates the stack in place like an RPN calculator step.'
      )
    ),

    mc(
      't4-q5',
      'In postfix notation `3 4 +`, when should the `+` operator be applied?',
      [
        { id: 'a', text: 'Before reading any operands' },
        { id: 'b', text: 'Immediately after its two operands are available on the stack' },
        { id: 'c', text: 'After the entire expression is read, left to right' },
        { id: 'd', text: 'Only if parentheses are present' },
      ],
      'b',
      ms(
        'After both operands are on the stack.',
        'Postfix is operand-first: read 3, read 4, then + combines the two values already on the stack. No lookahead or parentheses are needed.'
      )
    ),

    tf(
      't4-q6',
      'In a circular queue, wrapping the back pointer prevents shifting elements when dequeuing, unlike a list-based queue that uses pop(0).',
      'true',
      ms(
        'True — circular indices avoid O(n) shifts.',
        'A circular buffer reuses fixed slots by modulo arithmetic on front/back indices. List pop(0) must move every remaining element, which is why production queues prefer ring buffers or deques.'
      )
    ),
  ],
};

export default test4;
