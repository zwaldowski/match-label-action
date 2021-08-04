export function parseAllowed(allowed) {
  return allowed.split(/\r?\n/).flatMap((line) =>
    line
      .split(/,\s*/)
      .map((label) => label.trim())
      .filter((label) => label)
  )
}

export function findMatching(labelNames, allowedLabels, isMultipleAllowed) {
  const allowedLabelsSet = new Set(allowedLabels)
  const matchingLabels = labelNames.filter((labelName) =>
    allowedLabelsSet.has(labelName)
  )
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
