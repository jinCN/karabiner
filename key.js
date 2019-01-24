#!/usr/bin/env osascript -l JavaScript

function run (argv) {
  if (argv.length === 0) return
  let func = funcs[argv[0]]
  if (func && typeof func === 'function') {
    func(...argv.slice(1))
  }else{
    press(...argv)
  }
}

let funcs = { press, type, input, replace, delay, menu: menu_item }
// How to use:
//   1. Open "Script Editor" (requires OS X 10.10 Yosemite)
//   2. Change the language from "AppleScript" to "JavaScript"
//   3. Paste the code below and replace the safari example.
//
// More info:
// https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/index.html

var system_events = Application('System Events')
system_events.includeStandardAdditions = true
// More keycodes can be added. Keycode reference:
// http://www.codemacs.com/coding/applescript/applescript-key-codes-reference.8288271.htm
var key_codes = {
  '→': 124,
  '←': 123,
  '↑': 126,
  '↓': 125,
  '⏎': 36
}
var modifiers = {
  '⌘': 'command down',
  '^': 'control down',
  '⌥': 'option down',
  '⇧': 'shift down'
}
let replaceStr=`
;；
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
let replaceStr2=`
'‘’
"“”
(（）
<《》
[【】
{「」
`
let replaceTable={}
replaceStr.split('\n').forEach(v=> {
  replaceTable[v[0]] = v.substring(1)
})
let replaceTable2 = {}
replaceStr2.split('\n').forEach(v => {
  replaceTable2[v[0]] = v.substring(1)
})
function replace () {
  let oldClip = system_events.theClipboard()
  
  system_events.keyCode(123, { using: ['shift down'] })
  system_events.keystroke('c', { using: ['command down'] })
  delay(0.01)
  
  let clip = system_events.theClipboard()
  let x = clip[clip.length-1]
  if(replaceTable[x]){
    delay(0.5)
    system_events.setTheClipboardTo(replaceTable[x])
    delay(0.01)

    system_events.keystroke('v', { using: ['command down'] })
    delay(0.1)
    system_events.setTheClipboardTo(oldClip)
  }
  else if(replaceTable2[x]){
    delay(0.5)
    system_events.setTheClipboardTo(replaceTable2[x])
    delay(0.01)

    system_events.keystroke('v', { using: ['command down'] })
    delay(0.01)
    system_events.keyCode(123)
    delay(0.1)
    system_events.setTheClipboardTo(oldClip)
  }
  else{
    system_events.keyCode(124)
    delay(0.5)
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

function press (hotkey) {
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
  }
  else {
    system_events.keystroke(hotkey.toLowerCase(), { using: using })
  }
}

function type (text) {
  for (var i = 0; i < text.length; i++) {
    system_events.keystroke(text[i])
  }
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
