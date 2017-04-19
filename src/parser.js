export function getMatches(string, regex) {
  const parts = []
  let match
  let endOfLastMatch = 0
  regex.lastIndex = 0
  do {
    match = regex.exec(string)
    if (match) {
      if (match.index > 0) {
        const before = string.substring(endOfLastMatch, match.index)
        parts.push(before)
      }
      parts.push(match)
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
