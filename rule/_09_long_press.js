const rules = require('.')
let rule = { description: 'Long press to shift any input key' }
rules.push(rule)

let codesNum = Array(10).fill(0).map((v, i) => i + '')
let codesSymbol = Object.values({
  ',': 'comma',
  '.': 'period',
  '/': 'slash',
  ';': 'semicolon',
  '\'': 'quote',
  '[': 'open_bracket',
  ']': 'close_bracket',
  '-': 'hyphen',
  '=': 'equal_sign',
  '\\': 'backslash',
  '`': 'grave_accent_and_tilde'
})

function template (code, shift = false, isNum = false) {
  if (shift) {
    return [
      {
    'type': 'basic',
    'from': {
      'key_code': code, modifiers: { mandatory: 'shift' }
    },
    'to': [
      {
        'key_code': code, modifiers: 'shift',
        'repeat': false
      }],
    'to_if_held_down': [
      { 'key_code': 'delete_or_backspace' },
      { 'key_code': 'period', modifiers: 'left_control' },
      { 'key_code': code, modifiers: 'shift' },
      { 'shell_command': 'key switch' }]
      }]
  } else {
    let name = `double_press-${code}`
    return [
      {
        'conditions': [
          {
            'name': name,
            'type': 'variable_if',
            'value': 1
          }
        ],
        'from': {
          'key_code': code
        },
        'to': [
          {
            'key_code': code,
            'repeat': false
          }, {
            'set_variable': {
              'name': name,
              'value': 1
            }
          }],
        'parameters': {
          'basic.to_if_held_down_threshold_milliseconds': 180
        },
        'to_if_held_down': [
          {
            'key_code': 'delete_or_backspace'
          },
          {
            'key_code': 'delete_or_backspace'
          },
          {
            'key_code': code,
            'modifiers': 'left_shift'
          },
          {
            'set_variable': {
              'name': name,
              'value': 0
            }
          }
        ],
        'type': 'basic'
      }
      , {
        conditions: [
          {
            'type': 'input_source_if',
            'input_sources': [
              {
                'language': 'zh',
                'input_source_id': 'sogou',
                'input_mode_id': 'sogou'
              }
            ]
          }
        ],
        'type': 'basic',
        'from': {
          'key_code': code
        },
        'to': [
          {
            'key_code': code,
            'repeat': false
          }, {
            'set_variable': {
              'name': name,
              'value': 1
            }
          }],
        'parameters': {
          'basic.to_delayed_action_delay_milliseconds': 200
        },
        'to_delayed_action': {
          'to_if_canceled': [
            {
              'set_variable': {
                'name': name,
                'value': 0
              }
            }
          ],
          'to_if_invoked': [
            {
              'set_variable': {
                'name': name,
                'value': 0
              }
            }
          ]
        },
        'to_if_held_down': [
          { 'key_code': 'delete_or_backspace' },
          { 'key_code': 'period', modifiers: 'left_control' },
          { 'key_code': code },
          { 'shell_command': 'key switch' }]
      },
      {
        conditions: [
          {
            'type': 'input_source_unless',
            'input_sources': [
              {
                'language': 'zh',
                'input_source_id': 'sogou',
                'input_mode_id': 'sogou'
              }
            ]
          }
        ],
        'type': 'basic',
        'from': {
          'key_code': code
        },
        'to': [
          {
            'key_code': code,
            'repeat': false
          }, {
            'set_variable': {
              'name': name,
              'value': 1
            }
          }],
        'parameters': {
          'basic.to_delayed_action_delay_milliseconds': 300
        },
        'to_delayed_action': {
          'to_if_canceled': [
            {
              'set_variable': {
                'name': name,
                'value': 0
              }
            }
          ],
          'to_if_invoked': [
            {
              'set_variable': {
                'name': name,
                'value': 0
              }
            }
          ]
        }
      }
    ]
  }
}

rule.manipulators = []
codesSymbol.map(v => rule.manipulators.push(...template(v)))
codesSymbol.map(v => rule.manipulators.push(...template(v, true)))
codesNum.map(v => rule.manipulators.push(...template(v, false, true)))
codesNum.map(v => rule.manipulators.push(...template(v, true, true)))
