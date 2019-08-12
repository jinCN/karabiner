const rules = require('.')
const code = require('./common/code')

let rule= {
  "description": "left_control to enter",
  "manipulators": [
    {
      "from": {
        "key_code": "left_control",
        "modifiers": {
          "optional": [
            "any"
          ]
        }
      },
      "to": [
        {
          "key_code": "left_control",
          "lazy": true
        }
      ],
      "to_if_alone": [
        {
          "key_code": "return_or_enter"
        }
      ],
      "type": "basic"
    }
  ]
}
rules.push(rule)
