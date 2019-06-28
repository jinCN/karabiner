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

function template (code, shift = false) {
  if (code === 'hyphen' && !shift) {
    return {
      'type': 'basic',
      'from': {
        'key_code': code
      },
      'to': [
        {
          'key_code': code,
          'repeat': false
        }],
      'to_if_held_down': [
        {
          'key_code': code,
          modifiers: 'shift',
          'repeat': false
        }]
    }
  }
  return {
    'type': 'basic',
    'from': {
      'key_code': code, ...shift && { modifiers: { mandatory: 'shift' } }
    },
    'to': [
      {
        'key_code': code, ...shift && { modifiers: 'shift' },
        'repeat': false
      }],
    'to_if_held_down': [
      { 'key_code': 'delete_or_backspace' },
      { 'key_code': 'period', modifiers: 'left_control' },
      { 'key_code': code, ...shift && { modifiers: 'shift' } },
      { 'shell_command': 'key switch' }]
  }
}

rule.manipulators = codesSymbol.map(v => template(v))
  .concat(codesSymbol.map(v => template(v, true)))
  .concat(codesNum.map(v => template(v, true)))
