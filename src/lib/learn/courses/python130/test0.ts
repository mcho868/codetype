import type { Module } from './types';
import { cr, mc, tf, funcCases, ms } from './authoring';

const test0: Module = {
  id: 'test-0',
  slug: 'test-0',
  title: 'Module 0 Test — Testing & Exceptions',
  description:
    'Transfer-level practice: multi-except dispatch, custom raise with a driver, and nested try/finally execution order.',
  icon: '📝',
  color: 'from-red-500 to-rose-400',
  locked: false,
  isMidterm: true,
  lessons: [],
  questions: [
    cr(
      't0-q1',
      'Implement `dispatch_operation(op, a, b)` that performs one of three operations inside a single `try` block and maps exceptions to string codes:\n\n- `"div"` → `a / b`\n- `"int"` → `int(a)` (ignore `b`)\n- `"index"` → `a[b]` (`a` is a list, `b` is an index)\n\nReturn the result on success. On failure return:\n- `"zero"` for `ZeroDivisionError`\n- `"value"` for `ValueError`\n- `"index"` for `IndexError` or `TypeError`\n\nReturn `"unknown"` if `op` is not one of the three operations.',
      `def dispatch_operation(op, a, b):
    pass
`,
      'function',
      funcCases(
        'dispatch_operation',
        [
          { id: 's1', description: 'Valid division', args: ['div', 10, 2], expectedReturn: 5.0 },
          { id: 's2', description: 'Division by zero', args: ['div', 1, 0], expectedReturn: 'zero' },
        ],
        [
          { id: 'h1', args: ['int', '42', 0], expectedReturn: 42 },
          { id: 'h2', args: ['int', 'abc', 0], expectedReturn: 'value' },
          { id: 'h3', args: ['index', [10, 20, 30], 1], expectedReturn: 20 },
          { id: 'h4', args: ['index', [1, 2], 9], expectedReturn: 'index' },
          { id: 'h5', args: ['sqrt', 1, 2], expectedReturn: 'unknown' },
        ]
      ),
      ms(
        `def dispatch_operation(op, a, b):
    try:
        if op == "div":
            return a / b
        if op == "int":
            return int(a)
        if op == "index":
            return a[b]
        return "unknown"
    except ZeroDivisionError:
        return "zero"
    except ValueError:
        return "value"
    except (IndexError, TypeError):
        return "index"`,
        'One try block can catch different exception types with separate except clauses — order matters when types overlap. Map each failure mode to a stable string code so callers can branch without re-raising.'
      )
    ),

    cr(
      't0-q2',
      'Implement `require_positive(n)` that **raises `ValueError`** when `n <= 0`, otherwise returns `n`.\n\nThe starter includes `check_require_positive` — **do not edit it**. Tests call that driver, which returns `"ok:<n>"` on success or `"error"` when `ValueError` is raised.',
      `def require_positive(n):
    pass


def check_require_positive(n):
    try:
        result = require_positive(n)
        return f"ok:{result}"
    except ValueError:
        return "error"
`,
      'function',
      funcCases(
        'check_require_positive',
        [
          { id: 's1', description: 'Positive value accepted', args: [5], expectedReturn: 'ok:5' },
          { id: 's2', description: 'Zero rejected', args: [0], expectedReturn: 'error' },
        ],
        [
          { id: 'h1', args: [1], expectedReturn: 'ok:1' },
          { id: 'h2', args: [-3], expectedReturn: 'error' },
          { id: 'h3', args: [100], expectedReturn: 'ok:100' },
        ]
      ),
      ms(
        `def require_positive(n):
    if n <= 0:
        raise ValueError("must be positive")
    return n`,
        'Use raise to signal invalid input instead of returning a sentinel. The driver wraps the call in try/except so tests can observe both success and failure paths without crashing the grader.'
      )
    ),

    cr(
      't0-q3',
      'Implement `trace_finally(should_raise)` returning a **list of strings** recording execution order.\n\nBehaviour:\n1. Append `"try"`\n2. If `should_raise` is `True`, raise `ValueError("boom")` **before** appending `"body"`\n3. If no exception, append `"body"`\n4. On `ValueError`, append `"except"`\n5. A `finally` block always appends `"finally"`\n\nReturn the log list.',
      `def trace_finally(should_raise):
    pass
`,
      'function',
      funcCases(
        'trace_finally',
        [
          { id: 's1', description: 'No exception', args: [false], expectedReturn: ['try', 'body', 'finally'] },
          { id: 's2', description: 'Exception caught', args: [true], expectedReturn: ['try', 'except', 'finally'] },
        ],
        [
          { id: 'h1', args: [false], expectedReturn: ['try', 'body', 'finally'] },
          { id: 'h2', args: [true], expectedReturn: ['try', 'except', 'finally'] },
        ]
      ),
      ms(
        `def trace_finally(should_raise):
    log = []
    try:
        log.append("try")
        if should_raise:
            raise ValueError("boom")
        log.append("body")
    except ValueError:
        log.append("except")
    finally:
        log.append("finally")
    return log`,
        'finally runs whether the try block completes, raises, or is caught by except. That makes it ideal for cleanup that must happen regardless of success or failure.'
      )
    ),

    cr(
      't0-q4',
      'A vending machine reads the coins a customer inserts. Each coin arrives as a **string** that should be a positive whole number of cents. Some entries are junk (e.g. `"abc"`) or invalid (zero or negative) — those should be **rejected**, not crash the machine.\n\nWrite `tally_coins(entries)` that processes the list of coin strings and returns a 3-element list `[total, rejected, processed]`:\n- `total` — the sum of all **valid** coin values\n- `rejected` — how many entries were invalid (not a whole number, or ≤ 0)\n- `processed` — how many entries were looked at in total (valid + rejected)\n\nUse `try`/`except` to handle the bad entries and a `finally` block to make sure every entry is counted as processed — even the ones that fail.',
      `def tally_coins(entries):
    pass
`,
      'function',
      funcCases(
        'tally_coins',
        [
          {
            id: 's1',
            description: 'All valid coins',
            args: [['10', '25', '5']],
            expectedReturn: [40, 0, 3],
          },
          {
            id: 's2',
            description: 'One junk entry rejected',
            args: [['10', 'abc', '25']],
            expectedReturn: [35, 1, 3],
          },
        ],
        [
          { id: 'h1', args: [[]], expectedReturn: [0, 0, 0] },
          { id: 'h2', args: [['-5', '0', '20']], expectedReturn: [20, 2, 3] },
          { id: 'h3', args: [['x', 'y']], expectedReturn: [0, 2, 2] },
          { id: 'h4', args: [['100']], expectedReturn: [100, 0, 1] },
        ]
      ),
      ms(
        `def tally_coins(entries):
    total = 0
    rejected = 0
    processed = 0
    for entry in entries:
        try:
            value = int(entry)
            if value <= 0:
                raise ValueError("non-positive coin")
            total += value
        except ValueError:
            rejected += 1
        finally:
            processed += 1
    return [total, rejected, processed]`,
        'Two failure paths funnel into one except: int(entry) raises ValueError on junk like "abc", and we deliberately raise ValueError for non-positive coins — both are rejected without crashing. The finally block runs on every iteration regardless of success or failure, which is exactly why "processed" stays accurate. This is the everyday shape of robust input parsing.'
      )
    ),

    mc(
      't0-q5',
      'Which `except` clause catches **both** `IndexError` and `KeyError` raised from the same `try` block?',
      [
        { id: 'a', text: 'except IndexError, KeyError:' },
        { id: 'b', text: 'except (IndexError, KeyError):' },
        { id: 'c', text: 'except IndexError or KeyError:' },
        { id: 'd', text: 'except LookupError only — KeyError is not a subclass' },
      ],
      'b',
      ms(
        'except (IndexError, KeyError):',
        'A tuple of exception types in one except clause catches any member of the tuple. Both IndexError and KeyError are subclasses of LookupError, but catching LookupError would also catch others (e.g. AttributeError in some contexts) — the tuple form is precise.'
      )
    ),

    tf(
      't0-q6',
      'If a `try` block raises an exception that is **not** caught by any `except` clause, the `finally` block still runs before the exception propagates out of the function.',
      'true',
      ms(
        'True — finally always runs on the way out.',
        'finally is tied to the try statement, not to whether except matched. Even an uncaught exception triggers finally before leaving the function, which is why finally is reliable for cleanup.'
      )
    ),
  ],
};

export default test0;
