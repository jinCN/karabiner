const rules = require('.')

let rule = { description: 'Long press to shift any input key' }
rules.push(rule)

const codeTable = require('./common/codeTable')
let longPressMapping = {
  a: '.',
  s: ',',
  d: '?',
  f: ':',
  q: '_',
  w: '-',
  e: '+',
  r: '=',
  t: '(',
  g: '[',
  x: '"',
  z: '\'',
  c: '`',
  v: '{',
  b: '/',
  y: '*',
  h: '\\'
}
let doublePressMapping = {
}
let tabMapping = {
  r: '>',
  t: ')',
  f: ';',
  g: ']',
  b: '~',
  v: '}',
  e: '<',
  q: '&',
  w: '|'
}

function longPressOp (code, shift = false) {
  if (shift === false) {
    if (longPressMapping[code]) {
      return codeTable.symbolToCode(longPressMapping[code])
    }
  }
  return { code, shift: true }
}

function doublePressOp (code, shift = false) {
  if (shift === false) {
    if (doublePressMapping[code]) {
      return codeTable.symbolToCode(doublePressMapping[code])
    }
  }
  return { code, shift: true }
}

function templateTab (code) {
  const symbol = tabMapping[code]
  if (symbol === undefined) {
    return []
  }
  const { code: tCode, shift: tShift } = codeTable.symbolToCode(symbol)
  let tCodeInt = codeTable.codeToInt(tCode, tShift)

  return [
    {
      'from': {
        'modifiers': {
          'optional': [
            'any'
          ]
        },
        'simultaneous': [
          {
            'key_code': 'tab'
          },
          {
            'key_code': code
          }
        ],
        'simultaneous_options': {
          'key_down_order': 'strict',

          'to_after_key_up': [
            {
              'set_variable': {
                'name': 'PadFN',
                'value': 0
              }
            }
          ]
        }
      },
      'parameters': {
        'basic.simultaneous_threshold_milliseconds': 700
      },
      'to': [
        {
          'set_variable': {
            'name': 'PadFN',
            'value': 1
          }
        },
        {
          'set_variable': {
            'name': 'last_code',
            'value': tCodeInt
          }
        },
        {
          'key_code': tCode,
          ...tShift && {
            'modifiers': 'shift'
          }
        }
      ],
      'type': 'basic'
    },
    {
      'conditions': [
        {
          'name': 'PadFN',
          'type': 'variable_if',
          'value': 1
        }
      ],
      'from': {
        'key_code': code,
        'modifiers': {
          'optional': [
            'any'
          ]
        }
      },
      'to': [
        {
          'set_variable': {
            'name': 'last_code',
            'value': tCodeInt
          }
        },
        {
          'key_code': tCode,
          ...tShift && {
            'modifiers': 'shift'
          }
        }

      ],
      'type': 'basic'
    }
  ]
}

function templateChineseSymbol (symbol) {
  const replaceSymbol = codeTable.replaceTable[symbol]
  if (replaceSymbol === undefined) return []

  const { code, shift } = codeTable.symbolToCode(symbol)
  const codeInt = codeTable.codeToInt(code, shift)

  return [
    {
      'conditions': [
        {
          'name': 'last_code',
          'type': 'variable_if',
          'value': codeInt
        }
      ],
      'parameters': {
        'basic.to_if_alone_timeout_milliseconds': 300
      },
      'from': {
        'key_code': 'left_shift'
      },
      'to': [
        {
          'key_code': 'left_shift'
        }
      ],
      'to_if_alone': [
        {
          'key_code': 'delete_or_backspace'
        },
        {
          'shell_command': `osascript -l JavaScript ~/.config/karabiner/key inputSymbol ${replaceSymbol}`
        }
      ],
      'type': 'basic'
    }
  ]
}

function template (code, shift = false) {
  let codeInt = codeTable.codeToInt(code, shift)
  const { code: dCode, shift: dShift } = doublePressOp(code, shift)
  let dCodeInt = codeTable.codeToInt(dCode, dShift)
  const { code: lCode, shift: lShift } = longPressOp(code, shift)
  let lCodeInt = codeTable.codeToInt(lCode, lShift)

  return [
    ...shift ? [] : [
      {
        'conditions': [
          {
            'name': 'just_pressed',
            'type': 'variable_if',
            'value': codeInt
          }
        ],
        'from': {
          'pointing_button': 'button2'
        },

        'to': [

          {
            'key_code': 'delete_or_backspace'
          },
          {
            'key_code': lCode,
            ...lShift && {
              'modifiers': 'shift'
            }
          },
          {
            'set_variable': {
              'name': 'last_code',
              'value': lCodeInt
            }
          }

        ],

        'type': 'basic'
      },
      {
        'conditions': [
          {
            'name': 'mouseRightFN',
            'type': 'variable_if',
            'value': 1
          }
        ],
        'from': {
          'key_code': code,
          'modifiers': {
            'optional': [
              'any'
            ]
          }
        },
        'to': [
          {
            'key_code': lCode,
            ...lShift && {
              'modifiers': 'shift'
            }
          },
          {
            'set_variable': {
              'name': 'last_code',
              'value': lCodeInt
            }
          }
        ],
        'type': 'basic'
      }
    ],

    {// shift 替换最后输入
      'conditions': [
        {
          'name': 'last_code',
          'type': 'variable_if',
          'value': codeInt
        }
      ],
      'parameters': {
        'basic.to_if_alone_timeout_milliseconds': 300
      },
      'from': {
        'key_code': 'left_shift',
        ...shift && {
          'modifiers': {
            'mandatory': 'shift'
          }
        }
      },
      'to': [
        {
          'key_code': 'left_shift',
          ...shift && {
            'modifiers': 'shift'
          }
        }
      ],
      'to_if_alone': [
        {
          'key_code': 'delete_or_backspace'
        },
        {
          'key_code': code,
          modifiers: 'shift'
        }
      ],
      'type': 'basic'
    },
    {// 双击并长按一会, 执行双击改键
      'conditions': [
        {
          'name': 'just_pressed',
          'type': 'variable_if',
          'value': codeInt
        }
      ],
      'from': {
        'key_code': code,
        ...shift && {
          'modifiers': {
            'mandatory': 'shift'
          }
        }
      },
      'to': [
        {
          'key_code': code,
          ...shift && {
            'modifiers': 'shift'
          },
          'repeat': false
        }, {
          'set_variable': {
            'name': 'last_code',
            'value': codeInt
          }
        },
        {
          'set_variable': {
            'name': 'just_pressed',
            'value': codeInt
          }
        }
      ],
      'parameters': {
        'basic.to_if_held_down_threshold_milliseconds': 200
      },
      'to_if_held_down': [

        {
          'key_code': 'delete_or_backspace'
        },
        {
          'key_code': 'delete_or_backspace'
        },
        {
          'key_code': dCode,
          ...dShift && {
            'modifiers': 'shift'
          }
        },
        {
          'set_variable': {
            'name': 'last_code',
            'value': dCodeInt
          }
        }

      ],
      'type': 'basic'
    },
    {// 长按一会, 执行长按改键
      'type': 'basic',
      'from': {
        'key_code': code,
        ...shift && {
          'modifiers': {
            'mandatory': 'shift'
          }
        }
      },
      'to': [
        {
          'key_code': code,
          ...shift && {
            'modifiers': 'shift'
          },
          'repeat': false
        }, {
          'set_variable': {
            'name': 'last_code',
            'value': codeInt
          }
        },
        {
          'set_variable': {
            'name': 'just_pressed',
            'value': codeInt
          }
        }],
      'parameters': {
        'basic.to_delayed_action_delay_milliseconds': 250,
        'basic.to_if_held_down_threshold_milliseconds': 300
      },
      'to_delayed_action': {
        'to_if_canceled': [
          {
            'set_variable': {
              'name': 'just_pressed',
              'value': 0
            }
          }
        ],
        'to_if_invoked': [
          {
            'set_variable': {
              'name': 'just_pressed',
              'value': 0
            }
          }
        ]
      },
      'to_if_held_down': [
        {
          'key_code': 'delete_or_backspace'
        },
        {
          'key_code': lCode,
          ...lShift && {
            'modifiers': 'shift'
          }
        },
        {
          'set_variable': {
            'name': 'last_code',
            'value': lCodeInt
          }
        }
      ]
    },

  ]
}

rule.manipulators = []
Object.keys(tabMapping).map(v => rule.manipulators.push(...templateTab(v)))
codeTable.chineseSymbols.map(v => rule.manipulators.push(...templateChineseSymbol(v)))
codeTable.codesAll.map(v => rule.manipulators.push(...template(v, true)))
codeTable.codesAll.map(v => rule.manipulators.push(...template(v)))
rule.manipulators.push(...[
  {
    'from': {
      'pointing_button': 'button2',
      'modifiers': {
        'optional': [
          'any'
        ]
      }
    },
    to: [
      {
        'set_variable': {
          'name': 'mouseRightFN',
          'value': 1
        }
      }
    ],
    to_after_key_up:[
      {
        'set_variable': {
          'name': 'mouseRightFN',
          'value': 0
        }
      }
    ],
    'to_if_alone': [
      { 'pointing_button': 'button2' }
    ],
    type:'basic'
  }

])
