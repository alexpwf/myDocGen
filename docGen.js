#!/usr/bin/env node

const Remarkable = require('remarkable')
const fs = require('fs')
const path = require('path')
const highlight = require('highlight.js')
const pdf = require('html-pdf')
const commander = require('commander')
const md = new Remarkable({
  highlight: (str, lang) => {
    if (lang && highlight.getLanguage(lang))
      try {
        return highlight.highlight(lang, str).value;
      } catch (err) {
        console.log(err)
      }
    try {
      return highlight.highlightAuto(str).value;
    } catch (err) {
      console.log(err)
    }
    return ''
  }
})

let input = ''
let output = ''
commander
  .version('1.0.0')
  .arguments('<input_path.md> [output_path.pdf]')
  .action((_input, _outout) => {
    input = _input
    output = _outout
  })

commander.parse(process.argv)
if (input === '') {
  console.error('No Markdown given!')
  commander.outputHelp()
  process.exit(1)
}

if (output == undefined) {
  output = input.replace(/\.[^/.]+$/, '.pdf')
}

console.log('converting ' + input + ' to ' + output)
const configPdf = {
  'base': 'file://' + __dirname + '/',
  'format': 'A4',
  'header': {
    'height': '15mm',
    'contents': {
      first: ' ',
      default: '<div style="text-align: center;border-bottom: 1px solid #eee;font-size: 12px;line-height: 1.6;">'
      + path.dirname(input).substring(path.dirname(input).lastIndexOf("\/") + 1) + '</div>'
    }
  },
  'footer': {
    'height': '18mm',
    'contents': {
      first: ' ',
      default: '<div style="text-align: right;font-size: 12px;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>',
    }
  },
  'border': {
    'top': '6px',
    'right': '6px',
    'bottom': '6px',
    'left': '6px'
  }
}

fs.readFile(input, 'utf8', (err, data) => {
  if (err)
    console.log(err)
  const head = '<link rel="stylesheet" href="static/mini.css">'
  // fs.writeFile('doc.html', head + md.render(data), () => console.log('doc html done'))
  pdf.create(head + md.render(data), configPdf).toFile(output, (err, res) => {
    if (err)
      console.log(err)
    else
      console.log('doc generated: ' + res.filename)
  })
})

