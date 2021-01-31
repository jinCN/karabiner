const rules = require('.')

let newRules = [
  {
    "description": "del_mode[ '=' as trigger key, except for hhkb]",
    "manipulators": [
      {
        "conditions": [
          {
            'name': 'double_press-equal_sign',
            'type': 'variable_unless',
            'value': 1
          },
          {
            "identifiers": [
              {
                "description": "hhkb",
                "product_id": 256,
                "vendor_id": 2131
              }
            ],
            "type": "device_unless"
          }
        ],
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "equal_sign"
            },
            {
              "key_code": "delete_or_backspace"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "DelFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 500
        },
        "to": [
          {
            "set_variable": {
              "name": "DelFN",
              "value": 1
            }
          },
          {
            "key_code": "delete_forward"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "DelFN",
            "type": "variable_if",
            "value": 1
          },
          {
            "identifiers": [
              {
                "description": "hhkb",
                "product_id": 256,
                "vendor_id": 2131
              }
            ],
            "type": "device_unless"
          }
        ],
        "from": {
          "key_code": "delete_or_backspace",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "delete_forward"
          }
        ],
        "type": "basic"
      }
    ]
  },
  {
    "description": "del_mode[ ']' as trigger key, for hhkb]",
    "manipulators": [
      {
        "conditions": [
          {
            'name': 'double_press-close_bracket',
            'type': 'variable_unless',
            'value': 1
          },
          {
            "identifiers": [
              {
                "description": "hhkb",
                "product_id": 256,
                "vendor_id": 2131
              },
              {
                "description": "hhkb",
                "product_id": 33,
                "vendor_id": 1278
              }
            ],
            "type": "device_if"
          }
        ],
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "close_bracket"
            },
            {
              "key_code": "delete_or_backspace"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "DelFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 500
        },
        "to": [
          {
            "set_variable": {
              "name": "DelFN",
              "value": 1
            }
          },
          {
            "key_code": "delete_forward"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "DelFN",
            "type": "variable_if",
            "value": 1
          },
          {
            "identifiers": [
              {
                "description": "hhkb",
                "product_id": 256,
                "vendor_id": 2131
              }
            ],
            "type": "device_if"
          }
        ],
        "from": {
          "key_code": "delete_or_backspace",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "delete_forward"
          }
        ],
        "type": "basic"
      }
    ]
  },
]

rules.push(...newRules)
