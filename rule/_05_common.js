const rules = require('.')
rules.push({
    'description': 'left_command+esc to sleep',
    'manipulators': [
      {
        'from': {
          'key_code': 'escape',
          'modifiers': {
            'mandatory': [
              'left_command',
            ],
          },
        },
        'to': [
          {
            'consumer_key_code': 'power',
            'modifiers': [
              'left_command',
              'left_option',
            ],
          },
        ],
        'type': 'basic',
      },
    ],
  },
  {
    'description': 'sample: left_command*2 to sleep',
    'sample_manipulators': [
      {
        'conditions': [
          {
            'name': 'left_command pressed',
            'type': 'variable_if',
            'value': 1,
          },
        ],
        'from': {
          'key_code': 'left_command',
        },
        'to': [
          {
            'consumer_key_code': 'power',
            'modifiers': [
              'left_command',
              'left_option',
            ],
          },
        ],
        'type': 'basic',
      },
      {
        'from': {
          'key_code': 'left_command',
          'modifiers': {
            'optional': [
              'any',
            ],
          },
        },
        'to': [
          {
            'set_variable': {
              'name': 'left_command pressed',
              'value': 1,
            },
          },
          {
            'key_code': 'left_command',
          },
        ],
        'to_delayed_action': {
          'to_if_canceled': [
            {
              'set_variable': {
                'name': 'left_command pressed',
                'value': 0,
              },
            },
          ],
          'to_if_invoked': [
            {
              'set_variable': {
                'name': 'left_command pressed',
                'value': 0,
              },
            },
          ],
        },
        'type': 'basic',
      },
    ],
  },
  {
    'description': 'long esc to restart chrome',
    'manipulators': [
      {
        'from': {
          'key_code': 'escape',
        },
        'parameters': {
          'basic.to_if_alone_timeout_milliseconds': 1000,
          'basic.to_if_held_down_threshold_milliseconds': 1000,
        },
        'to_if_alone': [
          {
            'key_code': 'escape',
          },
        ],
        'to_if_held_down': [
          {
            'shell_command': 'pkill \'Google Chrome\'',
          },
        ],
        'type': 'basic',
      },
    ],
  },
  {
    'description': 'left_command to change input method',
    'manipulators': [
      {
        'from': {
          'key_code': 'left_command',
        },
        'to': [
          {
            'key_code': 'left_command',
            'lazy': true,
          },
        ],
        'to_if_alone': [
          {
            'key_code': 'right_shift',
          },
          {
            'key_code': 'f12',
          },
        ],
        'type': 'basic',
      },
    ],
  },
)

