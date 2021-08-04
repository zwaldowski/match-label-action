import test from 'ava'
import {parseAllowed, findMatching} from './match.js'

test('parses newline-separated arguments', (t) => {
  const allowedLabels = parseAllowed('hello\nworld')
  t.deepEqual(allowedLabels, ['hello', 'world'])
})

test('parses comma-separated arguments', (t) => {
  const allowedLabels = parseAllowed('hello,world')
  t.deepEqual(allowedLabels, ['hello', 'world'])
})

test('parses mixed newline-and-comma arguments', (t) => {
  const allowedLabels = parseAllowed('major\nminor,patch')
  t.deepEqual(allowedLabels, ['major', 'minor', 'patch'])
})

test('parses arguments with whitespace', (t) => {
  const allowedLabels = parseAllowed('hello, world')
  t.deepEqual(allowedLabels, ['hello', 'world'])
})

test('parses arguments with excessive whitespace', (t) => {
  const allowedLabels = parseAllowed('hello    ,      world')
  t.deepEqual(allowedLabels, ['hello', 'world'])
})

test('parses arguments by skipping empty arguments', (t) => {
  const allowedLabels = parseAllowed('hello    ,,      world')
  t.deepEqual(allowedLabels, ['hello', 'world'])
})

test('match succeeds with exactly one label', (t) => {
  const matchedLabel = findMatching(
    ['minor'],
    ['major', 'minor', 'patch'],
    false
  )
  t.deepEqual(matchedLabel, ['minor'])
})

test('match throws for no labels', (t) => {
  t.throws(() => findMatching([], ['major', 'minor', 'patch'], false))
  t.throws(() => findMatching([], ['major', 'minor', 'patch'], true))
})

test('match throws for too many labels', (t) => {
  t.throws(() =>
    findMatching(['minor', 'patch'], ['major', 'minor', 'patch'], false)
  )
})

test('match does not throw for too many allowed multiple labels', (t) => {
  const matchLabel = findMatching(
    ['minor', 'patch'],
    ['major', 'minor', 'patch'],
    true
  )
  t.deepEqual(matchLabel, ['minor', 'patch'])
})
