const rules = require('.')
const code = require('./common/code')
let rule = { description: 'Super call anything with cmd+ctrl+shift+num' }
rules.push(rule)
rule.manipulators = []
let keys=['0','1','2','3','4','5','6','7','8','9', 'period','comma','j','k','l']
rule.manipulators.push(...keys.map(v=>template(v)))

function template(key){
  return {
    "from": {
      "key_code": key,
      "modifiers": {
        "mandatory": [
          "command",
          "control",
          "shift"
        ],
        "optional": [
          "caps_lock"
        ]
      }
    },
    "to": [
      {
        'shell_command': `osascript -l JavaScript ~/.config/karabiner/karabinerSuperCall ${key}`
      }
    ],
    "type": "basic"
  }
}
