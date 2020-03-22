const core = require('@actions/core')
const {context} = require('@actions/github')
const match = require('./match')

function run() {
  try {
    const pr = context.payload.pull_request || {}
    const labels = pr.labels || []
    const labelNames = labels.map(label => label.name)
    const allowedLabels = match.parseAllowed(core.getInput('allowed'))
    const allowedMultipleLabels = match.parseAllowed(
      core.getInput('allowed_multiple')
    )
    let matchingLabel
    if (allowedLabels.length > 0) {
      matchingLabel = match.findMatching(labelNames, allowedLabels, false)
    } else if (allowedMultipleLabels.length > 0) {
      matchingLabel = match.findMatching(
        labelNames,
        allowedMultipleLabels,
        true
      )
    } else {
      return core.setFailed(
        'You must provide either `allowed` or `allowed_multiple` as input.'
      )
    }

    core.setOutput('match', matchingLabel.join(', '))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
