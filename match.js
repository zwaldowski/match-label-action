function parseAllowed(allowed) {
  return allowed.split(/\r?\n/).flatMap((line) =>
    line
      .split(/,\s*/)
      .map((label) => label.trim())
      .filter(Boolean)
  )
}

function findMatching(
  labelNames,
  allowedLabels,
  isMultipleAllowed,
  defaultMatch
) {
  const allowedLabelsSet = new Set(allowedLabels)
  const matchingLabels = labelNames.filter((labelName) =>
    allowedLabelsSet.has(labelName)
  )
  if (
    matchingLabels.length === 0 &&
    defaultMatch !== undefined &&
    defaultMatch !== ''
  ) {
    return [defaultMatch]
  }

  if (
    isMultipleAllowed
      ? matchingLabels.length === 0
      : matchingLabels.length !== 1
  ) {
    const quantifier = isMultipleAllowed ? 'at least' : 'exactly'
    throw new Error(
      `Could not find ${quantifier} one of the appropriate labels on the PR.`
    )
  }

  return matchingLabels
}

module.exports = {parseAllowed, findMatching}
