function getMatchesForRegex(string, regex) {
  if (!regex) {
    return [string]
  }
  const parts = []
  let match
  let endOfLastMatch = 0
  regex.lastIndex = 0
  do {
    match = regex.exec(string)
    if (match) {
      // before match
      if (match.index > 0) {
        const before = string.substring(endOfLastMatch, match.index)
        parts.push(before)
      }
      // match
      parts.push({
        regex,
        execResult: match,
      })
      endOfLastMatch = match.index + match[0].length
    }
  } while (match)
  if (!endOfLastMatch) {
    parts.push(string)
  } else if (endOfLastMatch < string.length) {
    parts.push(string.substr(endOfLastMatch))
  }
  return parts
}

export function getMatches(string, regularExpressions = []) {
  let result = [string]
  let index = 0
  // loop through each regex
  regularExpressions.forEach(regex => {
    let nextResult = []
    // loop through each string/match
    result.forEach(node => {
      if (typeof node === 'string') {
        // replace the text node with the results
        const matches = getMatchesForRegex(node, regex)
        // Adjust .exec results so it appears as if it happened across the
        // original string instead of our broken up substrings.
        const matchesWithAdjustedIndices = matches.map(match => {
          if (typeof match === 'string') {
            return match
          }
          match.execResult.index += index
          match.execResult.input = string
          return match
        })
        nextResult = nextResult.concat(matches)
        index += node.length
      } else {
        // Don't try and process something that's already been matched.
        nextResult.push(node)
        index += node.execResult[0].length
      }
    })
    index = 0
    result = nextResult
  })
  return result
}
