import {execSync} from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import test from 'ava'

test('test runs without default value', (t) => {
  const ip = path.join(import.meta.dirname, 'index.js')
  const env = {
    ...process.env,
    INPUT_ALLOWED: 'hello,world',
    GITHUB_EVENT_PATH: path.join(import.meta.dirname, '.tests/context.json'),
    GITHUB_OUTPUT: undefined,
    GITHUB_STATE: undefined
  }
  const output = execSync(`node ${ip}`, {env, encoding: 'utf8'})
  t.is(output, '\n::set-output name=match::hello\n')
})

test('test runs with default value', (t) => {
  const ip = path.join(import.meta.dirname, 'index.js')
  const env = {
    ...process.env,
    INPUT_ALLOWED: 'goodbye',
    INPUT_DEFAULT_MATCH: 'default',
    GITHUB_EVENT_PATH: path.join(import.meta.dirname, '.tests/context.json'),
    GITHUB_OUTPUT: undefined,
    GITHUB_STATE: undefined
  }
  const output = execSync(`node ${ip}`, {env, encoding: 'utf8'})
  t.is(output, '\n::set-output name=match::default\n')
})
