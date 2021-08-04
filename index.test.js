import {execSync} from 'node:child_process'
import {env} from 'node:process'
import {fileURLToPath} from 'node:url'
import test from 'ava'

const TEST_CONTEXT_URL = new URL('.tests/context.json', import.meta.url)
const MAIN_URL = new URL('index.js', import.meta.url)

test('test runs', (t) => {
  env.INPUT_ALLOWED = 'hello,world'
  env.GITHUB_EVENT_PATH = fileURLToPath(TEST_CONTEXT_URL)
  const ip = fileURLToPath(MAIN_URL)
  const output = execSync(`node ${ip}`, {env, encoding: 'utf8'})
  t.is(output, '\n::set-output name=match::hello\n')
})
