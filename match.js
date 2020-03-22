function parseAllowed(allowed) {
  return allowed.split(/\r?\n/).reduce(
    (labels, line) =>
      labels
        .concat(line.split(/,\s*/))
        .filter(label => label)
        .map(label => label.trim()),
    []
  )
}

function findMatching(labelNames, allowedLabels, isMultipleAllowed) {
  const allowedLabelsSet = new Set(allowedLabels)
  const matchingLabels = labelNames.filter(labelName =>
    allowedLabelsSet.has(labelName)
  )
  if (
    isMultipleAllowed ? matchingLabels.length < 1 : matchingLabels.length !== 1
  ) {
    const quantifier = isMultipleAllowed ? 'at least' : 'exactly'
    throw new Error(
      `Could not find ${quantifier} one of the appropriate labels on the PR.`
    )
  }

  return matchingLabels
}

module.exports = {parseAllowed, findMatching}
