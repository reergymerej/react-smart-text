# react-smart-text

Replace meaningful strings in text with components.

[![Build Status](https://travis-ci.org/reergymerej/react-smart-text.svg?branch=master)](https://travis-ci.org/reergymerej/react-smart-text)


## Usage
This is a complete example of replacing email addresses with mailto anchors.

```js
import React from 'react'
import SmartText from 'react-smart-text'

// This is what we're hunting in the text.
const emailRegex = /\w+@.+?\.(com)/g

// This is what we want to replace matches with.
const Email = (props) =>
  <a href={`mailto:${props.text}`}>{props.text}</a>

const App = () =>
  <SmartText regex={emailRegex} component={Email}>
    My email address is dingo@bingo.com. Yours is you@the-zoo.com.
  </SmartText>

export default App
```

**Result**

<img width="520" alt="screenshot" src="https://cloud.githubusercontent.com/assets/1720010/25159597/680340e4-2476-11e7-90fd-c54fe07494ba.png">


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
