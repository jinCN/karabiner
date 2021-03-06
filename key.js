#!/usr/bin/env osascript -l JavaScript

//keycodes https://eastmanreference.com/complete-list-of-applescript-key-codes

function run (argv) {
  if (argv.length === 0) return
  let func = funcs[argv[0]]
  if (func && typeof func === 'function') {
    func(...argv.slice(1))
  } else {
    press(...argv)
  }
}

let funcs = {
  press,
  type,
  delayType,
  input,
  inputSymbol,
  replace,
  replaceRight,
  cutAndReplace,
  selectAndReplace,
  delay,
  menu: menu_item,
  switch: switch1
}
// How to use:
//   1. Open "Script Editor" (requires OS X 10.10 Yosemite)
//   2. Change the language from "AppleScript" to "JavaScript"
//   3. Paste the code below and replace the safari example.
//
// More info:
// https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/index.html

var system_events = Application('System Events')
system_events.includeStandardAdditions = true

app = Application.currentApplication()
app.includeStandardAdditions = true

function sh (s) {
  return app.doShellScript(s)
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
let replaceStr = `;；
:：
,，
.。
!！
?？
^……
_——
/、
]】
}」
>》
)）
\\、
\`·
`
let replaceStr2 = `'‘’
"“”
(（）
<《》
[【】
{「」
`
let replaceTable = {}
replaceStr.split('\n').forEach(v => {
  replaceTable[v[0]] = v.substring(1)
})
let replaceTable2 = {}
replaceStr2.split('\n').forEach(v => {
  replaceTable2[v[0]] = v.substring(1)
})

let rawReplaceStr = `;；
:：
,，
.。
!！
?？
]】
}」
>》
)）
"“
(（
<《
[【
{「
\\ 、
`
let rawReplaceTable = {}
rawReplaceStr.split('\n').forEach(v => {
  rawReplaceTable[v[0]] = v.substring(1)
})
let rawReplaceAllowSpaceStr = `.1
,0
:1
;0
!0
?1
\\1
`
let rawReplaceAllowSpaceTable = {}
rawReplaceAllowSpaceStr.split('\n').forEach(v => {
  rawReplaceAllowSpaceTable[v[0]] = v.substring(1)
})

function rawReplaceText (text) {
  let ret = ''
  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    let newChar = rawReplaceTable[char]
    if (newChar) {
      // 若原符号允许后接空格，那么忽略后一个可能的空格
      if (rawReplaceAllowSpaceTable[char]) {
        if (text[i + 1] === ' ') {
          i += 1
          ret += newChar
        } else if (rawReplaceAllowSpaceTable[char] === '0') {
          ret += newChar
        } else if(i + 1 === text.length ||
          text[i + 1] === '\n' ||
          text[i + 1] === '\r'){
          ret += newChar
        }else {
          ret += char
        }
      } else {
        ret += newChar
      }
    } else {
      ret += char
    }
  }
  return ret
}

function selectAndReplace () {
  system_events.keyCode(123, { using: ['command down', 'shift down'] })

  cutAndReplace()
}

function cutAndReplace () {
  let oldClip = system_events.theClipboard()

  system_events.keystroke('x', { using: ['command down'] })
  delay(0.05)

  let clip = system_events.theClipboard()
  let needSelection=false
  if (clip === oldClip) {
    needSelection = true
    system_events.keyCode(123, { using: ['command down'] })
    system_events.keyCode(124)
    system_events.keyCode(124)

    system_events.keyCode(124, { using: ['command down', 'shift down'] })
    system_events.keystroke('x', { using: ['command down'] })
    delay(0.05)

    clip = system_events.theClipboard()

  }

  let newText = rawReplaceText(clip)
  system_events.setTheClipboardTo(newText)
  delay(0.2)

  system_events.keystroke('v', { using: ['command down'] })

  delay(0.2)
  system_events.setTheClipboardTo(oldClip)
}

function replace () {

  let oldClip = system_events.theClipboard()

  system_events.keyCode(123, { using: ['shift down'] })
  system_events.keystroke('c', { using: ['command down'] })
  delay(0.05)

  let clip = system_events.theClipboard()
  let x = clip[clip.length - 1]
  if (replaceTable[x] || x.match(/[a-z]/)) {
    system_events.keyCode(124)
    system_events.keyCode(51)

    system_events.setTheClipboardTo(replaceTable[x] || x.toUpperCase())
    delay(0.05)

    system_events.keystroke('v', { using: ['command down'] })
    delay(0.2)
    system_events.setTheClipboardTo(oldClip)
  } else if (replaceTable2[x]) {
    system_events.keyCode(124)
    system_events.keyCode(51)

    system_events.setTheClipboardTo(replaceTable2[x])
    delay(0.05)

    system_events.keystroke('v', { using: ['command down'] })
    delay(0.01)
    system_events.keyCode(123)
    delay(0.2)
    system_events.setTheClipboardTo(oldClip)
  } else {
    system_events.keyCode(124)
    delay(0.2)
    system_events.setTheClipboardTo(oldClip)
  }
}

function replaceRight () {

  let oldClip = system_events.theClipboard()

  system_events.keyCode(124, { using: ['shift down'] })
  system_events.keystroke('c', { using: ['command down'] })
  delay(0.05)

  let clip = system_events.theClipboard()
  let x = clip[clip.length - 1]
  if (replaceTable[x] || x.match(/[a-z]/)) {
    system_events.keyCode(123)
    system_events.keyCode(124)
    system_events.keyCode(51)

    system_events.setTheClipboardTo(replaceTable[x] || x.toUpperCase())
    delay(0.05)

    system_events.keystroke('v', { using: ['command down'] })
    delay(0.01)
    system_events.keyCode(123)

    delay(0.2)
    system_events.setTheClipboardTo(oldClip)
  } else if (replaceTable2[x]) {
    system_events.keyCode(123)
    system_events.keyCode(124)
    system_events.keyCode(51)

    system_events.setTheClipboardTo(replaceTable2[x][0])
    delay(0.05)

    system_events.keystroke('v', { using: ['command down'] })
    delay(0.01)
    system_events.keyCode(123)
    delay(0.2)
    system_events.setTheClipboardTo(oldClip)
  } else {
    system_events.keyCode(123)
    delay(0.2)
    system_events.setTheClipboardTo(oldClip)
  }
}

function input (text) {
  let oldClip = system_events.theClipboard()
  system_events.setTheClipboardTo(text)
  system_events.keystroke('v', { using: ['command down'] })
  delay(0.1)
  system_events.setTheClipboardTo(oldClip)
}

function inputSymbol (text) {
  let oldClip = system_events.theClipboard()
  system_events.setTheClipboardTo(text)
  system_events.keystroke('v', { using: ['command down'] })
  if (text.length > 1 && text !== '……' && text !== '——') {
    delay(0.05)
    system_events.keyCode(123)
  }
  delay(0.1)
  system_events.setTheClipboardTo(oldClip)
}

function switch1 () {
  system_events.keyCode(47, { using: ['control down'] })
}

function press (hotkey) {
  delay(0.1)

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

function delayType (text) {
  delay(0.10)
  type(text)
}

function menu_item () {
  if (!arguments.length) return

  var process = system_events.processes.whose({ 'frontmost': true })[0]
  var menu_bar = process.menuBars[0].menuBarItems[arguments[0]]

  var menu_item = menu_bar
  for (var i = 1; i < arguments.length; i++) {
    menu_item = menu_item.menus[0].menuItems[arguments[i]]
  }
  menu_item.click()
}

////////////////////////////////////////////////////////////
//  Example use: Safari
////////////////////////////////////////////////////////////
//
// var Safari = Application("Safari");
//
// // Give Safari the focus
// Safari.activate();
//
// // Give it a second, it's practically magic (literally waits 1 second)
// delay(0.5)
//
// // New window:
// press("⌘N")
//
// // Another new Window
// menu_item("File", "New Window")
//
// // select address bar
// press("⌘L")
//
// // enter a url
// type("http://www.google.com")
//
// // press enter and wait for the page to load before doing more stuff
// press("⏎")
// delay(1.5)
//
// // open your favorite blog in a new tab
// press("⌘T")
// delay(1.0) // wait for new tab animation so we can start typing
// type("http://jiaaro.com")
// press("⏎")
