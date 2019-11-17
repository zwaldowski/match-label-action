const core = require('@actions/core')
const {context} = require('@actions/github')
const match = require('./match');

function run() {
  try {
    const pr = context.payload.pull_request || {}
    const labels = pr.labels || []
    const labelNames = labels.map(label => label.name)
    const allowedLabels = match.parseAllowed(core.getInput('allowed'))
    const matchingLabel = match.findMatching(labelNames, allowedLabels)
    core.setOutput('match', matchingLabel)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
