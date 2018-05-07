import React from 'react'
import PropTypes from 'prop-types'
import { getMatches } from './parser'

const DefaultOuterComponent = (props) =>
  <div>{props.children}</div>

const SmartText = (props) => {
  const {
    component,
    outerComponent: OuterComponent,
    regex,
    children = '',
    componentProps,
  } = props
  // handle alternate props
  const replacements = [...props.replacements]
  if (!replacements.length && regex && component) {
    replacements.push({
      regex,
      component,
      componentProps,
    })
  }
  const regularExpressions = replacements.map(r => r.regex)
  // There's nothing to replace.
  if (!regularExpressions.length) {
    return <OuterComponent>{children}</OuterComponent>
  }
  const matches = getMatches(children, regularExpressions)
  return (
    <OuterComponent>
      { matches.map((node, i) => {
        if (typeof node === 'string') {
          return node
        }
        const replacementIndex = replacements.findIndex(replacement => {
          return replacement.regex === node.regex
        })
        const ComponentForMatch = replacements[replacementIndex].component
        const componentPropsForMatch = replacements[replacementIndex].componentProps
        return (
          <ComponentForMatch
            key={i}
            {...componentPropsForMatch}
            result={node.execResult}
            text={node.execResult[0]}
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
  componentProps: PropTypes.object,
  replacements: PropTypes.arrayOf(PropTypes.shape({
    regex: PropTypes.instanceOf(RegExp).isRequired,
    component: PropTypes.func,
    componentProps: PropTypes.object,
  })).isRequired,

  children: PropTypes.string.isRequired,
}

SmartText.defaultProps = {
  outerComponent: DefaultOuterComponent,
  replacements: [],
  componentProps: {},
}

export default SmartText
