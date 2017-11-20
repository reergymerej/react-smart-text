import React from 'react'
import PropTypes from 'prop-types'
import { getMatches } from './parser'

const DefaultOuterComponent = (props) =>
  <div>{props.children}</div>

const SmartText = (props) => {
  const {
    children,
    component,
    customProps,
    outerComponent: OuterComponent,
    regex,
    replacements,
  } = props
  console.log('regex', regex)
  // handle alternate props
  if (!replacements.length && regex && component) {
    replacements.push({
      component,
      customProps,
      regex,
    })
  }
  const regularExpressions = replacements.map(r => r.regex)
  // There's nothing to replace.
  if (!regularExpressions.length) {
    return <OuterComponent>{children}</OuterComponent>
  }
  const matches = getMatches(children, regularExpressions)
  if (props.customProps) {
    console.log('matches:', matches)
  }
  return (
    <OuterComponent>
      { matches.map((node, i) => {
        if (typeof node === 'string') {
          return node
        }
        const replacementIndex = replacements.findIndex(replacement => {
          return replacement.regex === node.regex
        })

        const option = replacements[replacementIndex]
        const ComponentForMatch = option.component
        const { customProps } = option
        return (
          <ComponentForMatch
            key={i}
            result={node.execResult}
            text={node.execResult[0]}
            {...customProps}
          />
        )
      })}
    </OuterComponent>
  )
}

SmartText.propTypes = {
  outerComponent: PropTypes.func.isRequired,
  regex: PropTypes.instanceOf(RegExp), // required if not using "replacements"
  component: PropTypes.func,  // required if not using "replacements"
  replacements: PropTypes.arrayOf(PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp).isRequired,
    component: PropTypes.func,
  })).isRequired,

  children: PropTypes.string.isRequired,
}

SmartText.defaultProps = {
  outerComponent: DefaultOuterComponent,
  replacements: [],
}

export default SmartText
