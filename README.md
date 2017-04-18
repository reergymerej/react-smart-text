# react-smart-text

Replace meaningful strings in text with components.


## Usage
```js
const Foo = (props) => {
  const { result, text } = props
  // TODO: Do cool stuff based on the RegExp.exec result.
  // console.log({ result })
  return <div className="foo">{text}</div>
}

<SmartText
  regex={/(banana|tomato)/g}
  component={Foo}
>
  apple banana pear tomato blueberry
</SmartText>
```


* Wrap a string in the component.
* props:
** regex - to find in string
** component - to replace matches
** outerComponent - single component to wrap everything in, defaults to a plain
div

Components will be passed the prop "match" so you can do what you want with it.


## Test

`yarn test`





---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
