const rules = require('.')
const code = require('./common/code')
let rule = { description: 'Long press to shift any input key' }
rules.push(rule)
let codes = Array(26)
.fill(0)
.map((v, i) => String.fromCharCode('a'.charCodeAt() + i))
codes = codes.concat(Array(10).fill(0).map((v, i) => i + ''))
codes = codes.concat(Object.values({
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
}))

function template (code) {
  return {
    'type': 'basic',
    'from': { 'key_code': code },
    'to': [{ 'key_code': code,'repeat':false }],
    'to_if_held_down': [
      { 'key_code': 'delete_or_backspace' },
      { 'key_code': code, 'modifiers': 'left_shift', 'repeat': false }]
  }
}

rule.manipulators = codes.map(v => template(v))
