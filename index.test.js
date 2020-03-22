const cp = require('child_process')
const path = require('path')
const test = require('ava')

test('test runs', t => {
  process.env.INPUT_ALLOWED = 'hello,world'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  const ip = path.join(__dirname, 'index.js')
  const output = cp.execSync(`node ${ip}`, {env: process.env, encoding: 'utf8'})
  t.is(output, '::set-output name=match::hello\n')
})
