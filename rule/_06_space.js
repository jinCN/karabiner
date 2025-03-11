const rules = require('.')

let newRules = [
  {
    "description": "arrow_mode[space as trigger key]",
    "manipulators": [
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "z"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "pointing_button": "button1"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "z",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "pointing_button": "button1"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "x"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "pointing_button": "button3"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "x",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "pointing_button": "button3"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "c"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "pointing_button": "button2"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "c",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "pointing_button": "button2"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "v"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "mouse_key": {
              "vertical_wheel": 30
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "v",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "mouse_key": {
              "vertical_wheel": 30
            }
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "b"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "mouse_key": {
              "vertical_wheel": -30
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "b",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "mouse_key": {
              "vertical_wheel": -30
            }
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "i"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "mouse_key": {
              "y": -420
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "i",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "mouse_key": {
              "y": -420
            }
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "k"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "mouse_key": {
              "y": 420
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "k",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "mouse_key": {
              "y": 420
            }
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "j"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "mouse_key": {
              "x": -520
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "j",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "mouse_key": {
              "x": -520
            }
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "l"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "mouse_key": {
              "x": 520
            }
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "l",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "mouse_key": {
              "x": 520
            }
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "q"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "delete_or_backspace"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "q",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "delete_or_backspace"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "t"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
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
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "t",
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
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "e"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "up_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "e",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "up_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "d"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "down_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "d",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "down_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "s"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "left_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "s",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "left_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "f"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "right_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "f",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "right_arrow"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "w"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "left_arrow",
            "modifiers": "left_option"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "w",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "left_arrow",
            "modifiers": "left_option"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "r"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "right_arrow",
            "modifiers": "left_option"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "r",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "right_arrow",
            "modifiers": "left_option"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "a"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "left_arrow",
            "modifiers": "left_command"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "a",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "left_arrow",
            "modifiers": "left_command"
          }
        ],
        "type": "basic"
      },
      {
        "from": {
          "modifiers": {
            "optional": [
              "any"
            ]
          },
          "simultaneous": [
            {
              "key_code": "spacebar"
            },
            {
              "key_code": "g"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            "key_up_order": "strict_inverse",
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "SpaceFN",
                  "value": 0
                }
              }
            ]
          }
        },
        "parameters": {
          "basic.simultaneous_threshold_milliseconds": 800
        },
        "to": [
          {
            "set_variable": {
              "name": "SpaceFN",
              "value": 1
            }
          },
          {
            "key_code": "right_arrow",
            "modifiers": "left_command"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "SpaceFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "g",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "right_arrow",
            "modifiers": "left_command"
          }
        ],
        "type": "basic"
      }
    ]
  },
]

rules.push(...newRules)
