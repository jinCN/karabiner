const rules = require('.')

let newRules = [
  {
    'description': 'left_option*2 to selectAndReplace, left_option*1 to cutAndReplace',

    'manipulators': [
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
            'shell_command': `key selectAndReplace`
          }
        ],
        "type": "basic"
      },

      {
        'conditions': [
          {
            'name': 'mouseRightFN',
            'type': 'variable_if',
            'value': 1
          }
        ],
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
              'shell_command': `key selectAndReplace`
            },
            {
              'set_variable': {
                'name': 'left_option pressed',
                'value': 0
              }
            }
          ]
        },
        'type': 'basic'
      },
      {
        'from': {
          'key_code': 'left_option'
        },
        'parameters': {
          'basic.to_delayed_action_delay_milliseconds': 400,
          'basic.to_if_held_down_threshold_milliseconds': 300
        },
        'to': [
          {
            'set_variable': {
              'name': 'left_option pressed',
              'value': 1
            }
          },
          {
            'key_code': 'left_option',
            'lazy': true
          }
        ],
        'to_if_held_down': [
          {
            'shell_command': `touch ~/.cancelVar`
          }, {
            'key_code': 'left_option'
          }],
        'to_delayed_action': {
          'to_if_canceled': [
            {
              'set_variable': {
                'name': 'left_option pressed',
                'value': 0
              }
            }
          ],
          'to_if_invoked': [
            {
              'shell_command': `if [ ! -f ~/.cancelVar ]; then
  key cutAndReplace;
else
  rm -f ~/.cancelVar;
fi`
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
