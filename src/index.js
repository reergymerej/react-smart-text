import React from 'react'
import PropTypes from 'prop-types'
import { getMatches } from './parser'

const SmartText = (props) => {
  const {
    component: Component,
    outerComponent: OuterComponent,
  } = props
  const matches = getMatches(props.children, props.regex)
  return (
    <OuterComponent>
      { matches.map((node, i) => {
        if (typeof node === 'string') {
          return node
        }
        return (
          <Component
            key={i}
            result={node}
            text={node[0]}
          />
        )
      })}
    </OuterComponent>
  )
}

SmartText.propTypes = {
  regex: PropTypes.instanceOf(RegExp),
  outerComponent: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

SmartText.defaultProps = {
  outerComponent: () => <div />,
}

export default SmartText
