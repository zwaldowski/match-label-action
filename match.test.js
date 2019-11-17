const match = require('./match');

test('parses newline-separated arguments', () => {
    const allowedLabels = match.parseAllowed('hello\nworld')
    expect(allowedLabels).toStrictEqual(['hello', 'world'])
})

test('parses comma-separated arguments', () => {
    const allowedLabels = match.parseAllowed('hello,world')
    expect(allowedLabels).toStrictEqual(['hello', 'world'])
})

test('parses mixed newline-and-comma arguments', () => {
    const allowedLabels = match.parseAllowed('major\nminor,patch')
    expect(allowedLabels).toStrictEqual(['major', 'minor', 'patch'])
})

test('parses arguments with extra whitespace', () => {
    const allowedLabels = match.parseAllowed('hello    ,      world')
    expect(allowedLabels).toStrictEqual(['hello', 'world'])
})

test('parses arguments by skipping empty arguments', () => {
    const allowedLabels = match.parseAllowed('hello    ,,      world')
    expect(allowedLabels).toStrictEqual(['hello', 'world'])
})

test('match succeeds with exactly one label', () => {
    const matchedLabel = match.findMatching([ 'minor' ], [ 'major', 'minor', 'patch' ])
    expect(matchedLabel).toBe('minor')
})

test('match throws for no labels', () => {
    expect(() => match.findMatching([], [ 'major', 'minor', 'patch' ])).toThrow()
})

test('match throws for too many labels', () => {
    expect(() => match.findMatching(['minor', 'patch'], [ 'major', 'minor', 'patch' ])).toThrow()
})
