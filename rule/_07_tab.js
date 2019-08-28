const rules = require('.')

let newRules = [
  {
    "description": "pad_mode['tab' as trigger key]",
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
              "key_code": "tab"
            },
            {
              "key_code": "n"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "0"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "n",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "0"
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
              "key_code": "tab"
            },
            {
              "key_code": "m"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "1"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "m",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "1"
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
              "key_code": "tab"
            },
            {
              "key_code": "comma"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "2"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "comma",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "2"
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
              "key_code": "tab"
            },
            {
              "key_code": "period"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "3"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "period",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "3"
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
              "key_code": "tab"
            },
            {
              "key_code": "j"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "4"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
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
            "key_code": "4"
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
              "key_code": "tab"
            },
            {
              "key_code": "k"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "5"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
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
            "key_code": "5"
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
              "key_code": "tab"
            },
            {
              "key_code": "l"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "6"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
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
            "key_code": "6"
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
              "key_code": "tab"
            },
            {
              "key_code": "u"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "7"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "u",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "7"
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
              "key_code": "tab"
            },
            {
              "key_code": "i"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "8"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
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
            "key_code": "8"
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
              "key_code": "tab"
            },
            {
              "key_code": "o"
            }
          ],
          "simultaneous_options": {
            "key_down_order": "strict",
            
            "to_after_key_up": [
              {
                "set_variable": {
                  "name": "PadFN",
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
              "name": "PadFN",
              "value": 1
            }
          },
          {
            "key_code": "9"
          }
        ],
        "type": "basic"
      },
      {
        "conditions": [
          {
            "name": "PadFN",
            "type": "variable_if",
            "value": 1
          }
        ],
        "from": {
          "key_code": "o",
          "modifiers": {
            "optional": [
              "any"
            ]
          }
        },
        "to": [
          {
            "key_code": "9"
          }
        ],
        "type": "basic"
      }
    ]
  }
]

rules.push(...newRules)
