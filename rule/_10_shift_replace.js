const rules = require('.')
const code = require('./common/code')
let rule = {
  description: 'left_shift to replace by rule',
  manipulators1: [
    {
      "parameters": {
        "basic.to_if_alone_timeout_milliseconds": 100
      },
      'from': {
        'key_code': 'left_shift'
      },
      'to': [
        {
          'key_code': 'left_shift',
          'lazy': true
        }
      ],
      'to_if_alone': [
        { 'shell_command': 'key replace' }
      ],
      'type': 'basic'
    }
  ]
}
rules.push(rule)
