let symbolTable = {
  'comma': ',',
  'period': '.',
  'slash': '/',
  'semicolon': ';',
  'quote': '\'',
  'open_bracket': '[',
  'close_bracket': ']',
  'hyphen': '-',
  'equal_sign': '=',
  'backslash': '\\',
  'grave_accent_and_tilde': '`'
}
let symbolToCodeTable = {
  ',': 'comma',
  '.': 'period',
  '/': 'slash',
  ';': 'semicolon',
  '\'': 'quote',
  '[': 'open_bracket',
  ']': 'close_bracket',
  '-': 'hyphen',
  '=': 'equal_sign',
  '\\': 'backslash',
  '`': 'grave_accent_and_tilde'
}
let codesNum = Array(10).fill().map((v, i) => i + '')
let codesLetter = Array(26)
  .fill()
  .map((v, i) => String.fromCharCode('a'.charCodeAt(0) + i))
let codesSymbol = Object.keys(symbolTable)

let codesAll = codesNum.concat(codesLetter).concat(codesSymbol)

function getType (code) {
  if (codesNum.includes(code)) {
    return 'num'
  } else if (codesLetter.includes(code)) {
    return 'letter'
  } else if (codesSymbol.includes(code)) {
    return 'symbol'
  } else {
    throw new Error('invalid code')
  }
}

function codeToInt (code, shift = false) {
  
  let index = codesAll.indexOf(code)
  if (index === -1) {
    throw new Error('invalid code')
  }
  return index + 1 + (shift ? 10000 : 0)
}

function intToCode (value) {
  let shift = false
  if (value >= 10000) {
    shift = true
    value -= 10000
  }
  if (codesAll[value - 1] === undefined) {
    throw new Error('invalid value')
  }
  return { code: codesAll[value - 1], shift }
}

let replaceStr1 = `;；
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
\`·`
let replaceStr2 = `'‘’
"“”
(（）
<《》
[【】
{「」`
let replaceTable = {}
let chineseSymbols = []
replaceStr1.split('\n').forEach(v => {
  replaceTable[v[0]] = v.substring(1)
  chineseSymbols.push(v[0])
})
replaceStr2.split('\n').forEach(v => {
  replaceTable[v[0]] = v.substring(1)
  chineseSymbols.push(v[0])
  
})

function symbolToInt (symbol) {
  const index = chineseSymbols.indexOf(symbol)
  if (index === -1) {
    throw new Error('invalid symbol')
  }
  return 1000 + index + 1
}

function intToSymbol (value) {
  let ret = chineseSymbols[value - 1000]
  if (ret === undefined) {
    throw new Error('invalid value')
  }
  return ret
}

function symbolToCode (symbol) {
  let index = symbolStr2.indexOf(symbol)
  if (index === -1) {
    throw new Error('invalid symbol')
  }
  let s = symbolStr2[index]
  let shift = false
  if (index % 2 === 1) {
    s = symbolStr2[index - 1]
    shift = true
  }
  
  if (s.match(/\d/)) {
    var code = s
  } else {
    code = symbolToCodeTable[s]
  }
  return { code, shift }
}

let symbolStr = `1!
2@
3#
4$
5%
6^
7&
8*
9(
0)
-_
=+
\\|
\`~
,<
.>
/?
;:
'"
[{
]}`
let symbolStr2 = symbolStr.replace(/\n/g, '')
let shiftTable = {}
symbolStr.split('\n').forEach(v => {
  shiftTable[v[0]] = v.substring(1)
})
module.exports = {
  symbolTable,
  codeToInt,
  intToCode,
  getType,
  codesAll,
  chineseSymbols,
  symbolToInt,
  intToSymbol,
  symbolToCode,
  replaceTable,
  shiftTable
}
