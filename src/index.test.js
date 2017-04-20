import React from 'react'
import { shallow } from 'enzyme'
import SmartText from './index'

const Foo = (props) => {
  const { result, text } = props
  // TODO: Do cool stuff based on the RegExp.exec result.
  // console.log({ result })
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

  it('should not explode if we skip the props')

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
  })
})
