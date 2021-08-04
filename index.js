import {getInput, setFailed, setOutput} from '@actions/core'
import {context} from '@actions/github'
import {findMatching, parseAllowed} from './match.js'

function run() {
  try {
    const pr = context.payload.pull_request || {}
    const labels = pr.labels || []
    const labelNames = labels.map((label) => label.name)
    const allowedLabels = parseAllowed(getInput('allowed'))
    const allowedMultipleLabels = parseAllowed(getInput('allowed_multiple'))
    let matchingLabel
    if (allowedLabels.length > 0) {
      matchingLabel = findMatching(labelNames, allowedLabels, false)
    } else if (allowedMultipleLabels.length > 0) {
      matchingLabel = findMatching(labelNames, allowedMultipleLabels, true)
    } else {
      return setFailed(
        'You must provide either `allowed` or `allowed_multiple` as input.'
      )
    }

    setOutput('match', matchingLabel.join(', '))
  } catch (error) {
    setFailed(error.message)
  }
}

run()
