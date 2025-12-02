const cp = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const process = require('node:process')
const test = require('ava')

test('test runs without default value', (t) => {
  const outputFile = path.join(os.tmpdir(), `github-output-${Date.now()}`)
  fs.writeFileSync(outputFile, '')
  process.env.INPUT_ALLOWED = 'hello,world'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  process.env.GITHUB_OUTPUT = outputFile
  const ip = path.join(__dirname, 'index.js')
  cp.execSync(`node ${ip}`, {env: process.env})
  const output = fs.readFileSync(outputFile, 'utf8')
  t.regex(output, /^match<<ghadelimiter_[\w-]+\nhello\nghadelimiter_[\w-]+\n$/)
  fs.unlinkSync(outputFile)
})

test('test runs with default value', (t) => {
  const outputFile = path.join(os.tmpdir(), `github-output-${Date.now()}`)
  fs.writeFileSync(outputFile, '')
  process.env.INPUT_ALLOWED = 'goodbye'
  process.env.INPUT_DEFAULT_MATCH = 'default'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  process.env.GITHUB_OUTPUT = outputFile
  const ip = path.join(__dirname, 'index.js')
  cp.execSync(`node ${ip}`, {env: process.env})
  const output = fs.readFileSync(outputFile, 'utf8')
  t.regex(
    output,
    /^match<<ghadelimiter_[\w-]+\ndefault\nghadelimiter_[\w-]+\n$/
  )
  fs.unlinkSync(outputFile)
})
