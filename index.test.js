const cp = require('child_process')
const path = require('path')
const process = require('process')
const test = require('ava')

test('test runs without default value', (t) => {
  process.env.INPUT_ALLOWED = 'hello,world'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  const ip = path.join(__dirname, 'index.js')
  const output = cp.execSync(`node ${ip}`, {env: process.env, encoding: 'utf8'})
  t.is(output, '\n::set-output name=match::hello\n')
})

test('test runs with default value', (t) => {
  process.env.INPUT_ALLOWED = 'goodbye'
  process.env.INPUT_DEFAULT_MATCH = 'default'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  const ip = path.join(__dirname, 'index.js')
  const output = cp.execSync(`node ${ip}`, {env: process.env, encoding: 'utf8'})
  t.is(output, '\n::set-output name=match::default\n')
})
