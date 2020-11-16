#!/usr/bin/env osascript -l JavaScript
function selectText () {
  let oldClip = system_events.theClipboard()
  system_events.keystroke('c', { using: ['command down'] })
  delay(0.05)
  let clip = system_events.theClipboard()
  system_events.setTheClipboardTo(oldClip)

  if (typeof clip !== 'string') return ''
  return clip
}

//keycodes https://eastmanreference.com/complete-list-of-applescript-key-codes
function run (argv) {
  try {
    let key
    if (argv.length === 0) {
      key = 'comma'
    } else {
      key = argv[0]
    }
    if (parseInt(key) + '' === key) {

    } else if (key === 'comma') {
      // do test function

      let script = selectText()
      var response = app.displayDialog('输入吧：', {
        defaultAnswer: script,
        withIcon: 'note'
      })
      // Result: {"buttonReturned":"Continue", "textReturned":"Jen"}
    } else if (key === 'period') {
      // kill running

      let ret = sh(`pkill -TERM -fl '/karabinerSuper'`)
      app.displayDialog(ret)
    } else if (key === 'j') {
      // js eval selected

      let script = selectText()
      let ret = ''
      if (script) {
        try {
          ret = sh(`export PATH=/Users/Jerry/.nvm/versions/node/v14.12.0/bin:$PATH;node ~/.config/karabiner/karabinerSuperCallJs.js ${shellUtils.quote(script)} 2>&1`)
        } catch (e) {
          ret = e + '\n' + e.stack
        }
      }
      let action = app.displayDialog(ret, {
        buttons: ['取消', '确认并复制'],
        defaultButton: '确认并复制',
        cancelButton: '取消'
      })
      if (action.buttonReturned === '确认并复制') {
        system_events.setTheClipboardTo(ret)
      }
    } else if (key === 'l') {
      // say selected

      let clip = selectText()

      if (clip) {
        sh(`/Users/Jerry/.config/karabiner/karabinerSuper/../../../../../usr/bin/say ${shellUtils.quote(clip)}`)
      }
    } else {
      throw new Error('not implemented')
    }
  } catch (e) {
    let info = `${new Date().toLocaleString()} ${e} ${e.stack}`
    console.log(`e:`, info)
    sh(`echo ${shellUtils.quote(info)} > ~/.superCallErr`)
  }
}

// <editor-fold> helpers
var system_events = Application('System Events')
system_events.includeStandardAdditions = true
app = Application.currentApplication()
app.includeStandardAdditions = true

function sh (s) {
  return app.doShellScript(s)
}

function zsh (s) {
  let source = `source ~/.zshrc\n`
  return app.doShellScript(`/bin/zsh -c ${shellUtils.quote(source + s)}`)
}

// More keycodes can be added. Keycode reference:
// http://www.codemacs.com/coding/applescript/applescript-key-codes-reference.8288271.htm
//noinspection NonAsciiCharacters
var key_codes = {
  '→': 124,
  '←': 123,
  '↑': 126,
  '↓': 125,
  '⏎': 36
}
//noinspection NonAsciiCharacters
var modifiers = {
  '⌘': 'command down',
  '^': 'control down',
  '⌥': 'option down',
  '⇧': 'shift down'
}

function press (hotkey) {
  delay(0.01)
  var using = []

  while (hotkey.length > 1) {
    if (modifiers[hotkey[0]] == null) {
      throw new Error(hotkey[0] + ' is not a recognized modifier key')
    }

    using.push(modifiers[hotkey[0]])
    hotkey = hotkey.slice(1)
  }

  if (key_codes[hotkey] != null) {
    system_events.keyCode(key_codes[hotkey], { using: using })
  } else {
    system_events.keystroke(hotkey.toLowerCase(), { using: using })
  }
}

function type (text) {
  for (var i = 0; i < text.length; i++) {
    system_events.keystroke(text[i])
  }
}

// <editor-fold> shellUtils.quote
let shellUtils = {}
shellUtils.quote = function (xs) {
  if (!Array.isArray(xs)) xs = [xs]
  return xs.map(function (s) {
    if (s && typeof s === 'object') {
      return s.op.replace(/(.)/g, '\\$1')
    } else if (/["\s]/.test(s) && !/'/.test(s)) {
      return '\'' + s.replace(/(['\\])/g, '\\$1') + '\''
    } else if (/["'\s]/.test(s)) {
      return '"' + s.replace(/(["\\$`!])/g, '\\$1') + '"'
    } else {
      return String(s)
        .replace(/([A-z]:)?([#!"$&'()*,:;<=>?@\[\\\]^`{|}])/g, '$1\\$2')
    }
  }).join(' ')
}

// '<(' is process substitution operator and
// can be parsed the same as control operator
var CONTROL = '(?:' + [
  '\\|\\|', '\\&\\&', ';;', '\\|\\&', '\\<\\(', '>>', '>\\&', '[&;()|<>]'
].join('|') + ')'
var META = '|&;()<> \\t'
var BAREWORD = '(\\\\[\'"' + META + ']|[^\\s\'"' + META + '])+'
var SINGLE_QUOTE = '"((\\\\"|[^"])*?)"'
var DOUBLE_QUOTE = '\'((\\\\\'|[^\'])*?)\''

var TOKEN = ''
for (var i = 0; i < 4; i++) {
  TOKEN += (Math.pow(16, 8) * Math.random()).toString(16)
}
shellUtils.parse = function (s, env, opts) {
  var mapped = parse(s, env, opts)
  if (typeof env !== 'function') return mapped
  return mapped.reduce(function (acc, s) {
    if (typeof s === 'object') return acc.concat(s)
    var xs = s.split(RegExp('(' + TOKEN + '.*?' + TOKEN + ')', 'g'))
    if (xs.length === 1) return acc.concat(xs[0])
    return acc.concat(xs.filter(Boolean).map(function (x) {
      if (RegExp('^' + TOKEN).test(x)) {
        return JSON.parse(x.split(TOKEN)[1])
      } else {
        return x
      }
    }))
  }, [])
}

function parse (s, env, opts) {
  var chunker = new RegExp([
    '(' + CONTROL + ')', // control chars
    '(' + BAREWORD + '|' + SINGLE_QUOTE + '|' + DOUBLE_QUOTE + ')*'
  ].join('|'), 'g')
  var match = s.match(chunker).filter(Boolean)
  var commented = false

  if (!match) return []
  if (!env) env = {}
  if (!opts) opts = {}
  return match.map(function (s, j) {
    if (commented) {
      return
    }
    if (RegExp('^' + CONTROL + '$').test(s)) {
      return { op: s }
    }

    // Hand-written scanner/parser for Bash quoting rules:
    //
    //  1. inside single quotes, all characters are printed literally.
    //  2. inside double quotes, all characters are printed literally
    //     except variables prefixed by '$' and backslashes followed by
    //     either a double quote or another backslash.
    //  3. outside of any quotes, backslashes are treated as escape
    //     characters and not printed (unless they are themselves escaped)
    //  4. quote context can switch mid-token if there is no whitespace
    //     between the two quote contexts (e.g. all'one'"token" parses as
    //     "allonetoken")
    var SQ = '\''
    var DQ = '"'
    var DS = '$'
    var BS = opts.escape || '\\'
    var quote = false
    var esc = false
    var out = ''
    var isGlob = false

    for (var i = 0, len = s.length; i < len; i++) {
      var c = s.charAt(i)
      isGlob = isGlob || (!quote && (c === '*' || c === '?'))
      if (esc) {
        out += c
        esc = false
      } else if (quote) {
        if (c === quote) {
          quote = false
        } else if (quote == SQ) {
          out += c
        } else { // Double quote
          if (c === BS) {
            i += 1
            c = s.charAt(i)
            if (c === DQ || c === BS || c === DS) {
              out += c
            } else {
              out += BS + c
            }
          } else if (c === DS) {
            out += parseEnvVar()
          } else {
            out += c
          }
        }
      } else if (c === DQ || c === SQ) {
        quote = c
      } else if (RegExp('^' + CONTROL + '$').test(c)) {
        return { op: s }
      } else if (RegExp('^#$').test(c)) {
        commented = true
        if (out.length) {
          return [
            out, { comment: s.slice(i + 1) + match.slice(j + 1).join(' ') }]
        }
        return [{ comment: s.slice(i + 1) + match.slice(j + 1).join(' ') }]
      } else if (c === BS) {
        esc = true
      } else if (c === DS) {
        out += parseEnvVar()
      } else {
        out += c
      }
    }

    if (isGlob) return { op: 'glob', pattern: out }

    return out

    function parseEnvVar () {
      i += 1
      var varend, varname
      //debugger
      if (s.charAt(i) === '{') {
        i += 1
        if (s.charAt(i) === '}') {
          throw new Error('Bad substitution: ' + s.substr(i - 2, 3))
        }
        varend = s.indexOf('}', i)
        if (varend < 0) {
          throw new Error('Bad substitution: ' + s.substr(i))
        }
        varname = s.substr(i, varend - i)
        i = varend
      } else if (/[*@#?$!_\-]/.test(s.charAt(i))) {
        varname = s.charAt(i)
        i += 1
      } else {
        varend = s.substr(i).match(/[^\w\d_]/)
        if (!varend) {
          varname = s.substr(i)
          i = s.length
        } else {
          varname = s.substr(i, varend.index)
          i += varend.index - 1
        }
      }
      return getVar(null, '', varname)
    }
  })
    // finalize parsed aruments
    .reduce(function (prev, arg) {
      if (arg === undefined) {
        return prev
      }
      return prev.concat(arg)
    }, [])

  function getVar (_, pre, key) {
    var r = typeof env === 'function' ? env(key) : env[key]
    if (r === undefined && key != '') {
      r = ''
    } else if (r === undefined) {
      r = '$'
    }

    if (typeof r === 'object') {
      return pre + TOKEN + JSON.stringify(r) + TOKEN
    } else {
      return pre + r
    }
  }
}

// </editor-fold>

// </editor-fold>
