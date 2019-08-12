const rules = require('.')
const code = require('./common/code')

let rule= {
  "description": "Quit application by pressing command-q twice",
  "manipulators": [
    {
      "conditions": [
        {
          "name": "command-q",
          "type": "variable_if",
          "value": 1
        }
      ],
      "from": {
        "key_code": "q",
        "modifiers": {
          "mandatory": [
            "command"
          ],
          "optional": [
            "caps_lock"
          ]
        }
      },
      "to": [
        {
          "key_code": "q",
          "modifiers": "left_command"
        }
      ],
      "type": "basic"
    },
    {
      "from": {
        "key_code": "q",
        "modifiers": {
          "mandatory": [
            "command"
          ],
          "optional": [
            "caps_lock"
          ]
        }
      },
      "to": [
        {
          "set_variable": {
            "name": "command-q",
            "value": 1
          }
        }
      ],
      "to_delayed_action": {
        "to_if_canceled": [
          {
            "set_variable": {
              "name": "command-q",
              "value": 0
            }
          }
        ],
        "to_if_invoked": [
          {
            "set_variable": {
              "name": "command-q",
              "value": 0
            }
          }
        ]
      },
      "type": "basic"
    }
  ]
}
rules.push(rule)
