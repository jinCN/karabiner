const rules = require('.')

let newRules = [
  {
    "description": "left_option*2 to switch back, left_option*1 to switch next",
    
    "manipulators1": [
      {
        "conditions": [
          {
            "name": "left_option pressed",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "left_option"
        },
        "to": [
          {
            "set_variable": {
              "name": "left_option pressed",
              "value": 0
            }
          },
          {
            "key_code": "grave_accent_and_tilde",
            "modifiers": [
              "left_command"
            ]
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "key_code": "left_option"
        },
        "parameters": {
          "basic.to_delayed_action_delay_milliseconds": 400
        },
        "to": [
          {
            "set_variable": {
              "name": "left_option pressed",
              "value": 1
            }
          },
          {
            "key_code": "left_option",
            "lazy": true
          }
        ],
        "to_delayed_action": {
          "to_if_canceled": [
            {
              "set_variable": {
                "name": "left_option pressed",
                "value": 0
              }
            }
          ],
          "to_if_invoked": [
            {
              "key_code": "grave_accent_and_tilde",
              "modifiers": [
                "left_command",
                "left_shift"
              ]
            },
            {
              "set_variable": {
                "name": "left_option pressed",
                "value": 0
              }
            }
          ]
        },
        "type": "basic"
      }
    ]
  },
]

rules.push(...newRules)
