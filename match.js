function parseAllowed(allowed) {
  return allowed
    .split(/\r?\n/)
    .reduce((labels, line) =>
      labels
        .concat(line.split(","))
        .filter(label => label)
        .map(label => label.trim()),
      [])
}

function findMatching(labelNames, allowedLabels) {
  const allowedLabelsSet = new Set(allowedLabels)
  const matchingLabels = labelNames.filter(labelName => allowedLabelsSet.has(labelName))
  if (matchingLabels.length != 1) {
    throw new Error('Could not find exactly one of the appropriate labels on the PR.')
  }
  return matchingLabels[0]
}

module.exports = {parseAllowed, findMatching};
