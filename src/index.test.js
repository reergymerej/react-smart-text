import React from 'react'
import { shallow } from 'enzyme'
import SmartText from './index'

const Foo = (props) => {
  const { result, text } = props
  // TODO: Do cool stuff based on the RegExp.exec result.
  return (
    <div className="foo">
      {text}
    </div>
  )
}

const Bar = (props) => (
  <div className="bar">
    {props.children}
  </div>
)

const Star = () => <span>*</span>

describe('react-smart-text', () => {
  it('should not explode if we skip the props', () => {
    shallow(<SmartText />)
  })

  it('should not die if we pass `undefined` children', () => {
    shallow(
      <SmartText
        replacements={[ { regex: /foo/g, component: Foo } ]}
      >{undefined}</SmartText>
    )
  })

  it('should use an outerComponent', () => {
    const regex = /(banana|tomato)/g
    const text = 'apple banana pear tomato blueberry'
    const wrapper = shallow(
      <SmartText
        regex={regex}
        component={Foo}
        outerComponent={Bar}
      >
        {text}
      </SmartText>
    )
    expect(wrapper.is('Bar')).toBe(true)
  })

  it('should replace text matches with a component', () => {
    const regex = /(banana|tomato)/g
    const text = 'apple banana pear tomato blueberry'
    const wrapper = shallow(
      <SmartText
        regex={regex}
        component={Foo}
      >
        {text}
      </SmartText>
    )
    expect(wrapper.find(Foo).length).toBe(2)
  })

  it('should pass the result to the component', () => {
    const regex = /(banana|tomato)/g
    const text = 'apple banana pear tomato blueberry'
    const wrapper = shallow(
      <SmartText
        regex={regex}
        component={Foo}
      >
        {text}
      </SmartText>
    )
    const foo = wrapper.find(Foo).at(0)
    regex.lastIndex = 0
    const match = regex.exec(text)
    expect(foo.prop('result')).toEqual(match)
  })

  it('should pass the text to the component', () => {
    const regex = /(banana|tomato)/g
    const text = 'apple banana pear tomato blueberry'
    const wrapper = shallow(
      <SmartText
        regex={regex}
        component={Foo}
      >
        {text}
      </SmartText>
    )
    const foo = wrapper.find(Foo).at(0)
    regex.lastIndex = 0
    const match = regex.exec(text)
    expect(foo.prop('text')).toEqual(match[0])
  })

  describe('replacements', () => {
    it('should work for a single replacement', () => {
      const regex = /[aeiou]/g
      const text = 'The quick brown fox jumps over the lazy dog.'
      const wrapper = shallow(
        <SmartText
          replacements={[
            {
              regex,
              component: Star,
            },
          ]}
        >
          {text}
        </SmartText>
      )
      expect(wrapper.html()).toBe('<div>Th<span>*</span> q<span>*</span><span>*</span>ck br<span>*</span>wn f<span>*</span>x j<span>*</span>mps <span>*</span>v<span>*</span>r th<span>*</span> l<span>*</span>zy d<span>*</span>g.</div>')
    })

    it('should work for multiple repacements', () => {
      const A = () => <div />
      const E = () => <span />
      const a = /a/g
      const e = /e/g
      const text = 'The quick brown fox jumps over the lazy dog.'
      const wrapper = shallow(
        <SmartText
          replacements={[
            {
              regex: a,
              component: A,
            },
            {
              regex: e,
              component: E,
            },
          ]}
        >
          {text}
        </SmartText>
      )
      expect(wrapper.html()).toBe('<div>Th<span></span> quick brown fox jumps ov<span></span>r th<span></span> l<div></div>zy dog.</div>')
    })

    it('should add callbacks to replacements', () => {
    })
  })

  describe('componentProps', () => {
    it('should be added to each replacement', () => {
      const spy = jest.fn()
      const componentRegex = (/bar/g)
      const Bar = () => (<div />)
      const barProps = {
        onClick: spy,
        onBoop: () => {},
      }
      const wrapper = shallow(
        <SmartText regex={componentRegex} component={Bar} componentProps={barProps}>
          foo bar baz
        </SmartText>
      )
      const comp = wrapper.find(Bar)
      // use instead of `simulate` to ensure we're grabbing what is actually
      // there
      const onClick = comp.prop('onClick')
      comp.prop('onClick')()
      expect(spy).toHaveBeenCalled()
      expect(typeof comp.prop('onBoop')).toBe('function')
    })
  })
})
