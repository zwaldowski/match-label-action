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

test('match returns default for no labels', (t) => {
  const matchedLabel = findMatching(
    [''],
    ['major', 'minor', 'patch'],
    false,
    'default'
  )
  t.deepEqual(matchedLabel, ['default'])
})

test('match returns default for no matching labels', (t) => {
  const matchedLabel = findMatching(
    ['not matching'],
    ['major', 'minor', 'patch'],
    false,
    'default'
  )
  t.deepEqual(matchedLabel, ['default'])
})

test('match returns default for no matching multiple labels', (t) => {
  const matchedLabel = findMatching(
    ['not matching', 'still not'],
    ['major', 'minor', 'patch'],
    true,
    'default'
  )
  t.deepEqual(matchedLabel, ['default'])
})

test('match does not return default for matching labels', (t) => {
  const matchedLabel = findMatching(
    ['not matching', 'minor'],
    ['major', 'minor', 'patch'],
    false,
    'default'
  )
  t.deepEqual(matchedLabel, ['minor'])
})

test('match does not return default for matchin multiple labels', (t) => {
  const matchedLabel = findMatching(
    ['major', 'minor'],
    ['major', 'minor', 'patch'],
    true,
    'default'
  )
  t.deepEqual(matchedLabel, ['major', 'minor'])
})

test('match does not return default for matchin multiple labels but not all', (t) => {
  const matchedLabel = findMatching(
    ['patch', 'not matching', 'minor'],
    ['major', 'minor', 'patch'],
    true,
    'default'
  )
  t.deepEqual(matchedLabel, ['patch', 'minor'])
})
