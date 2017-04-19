# react-smart-text

Replace meaningful substrings with components.

[![Build Status](https://travis-ci.org/reergymerej/react-smart-text.svg?branch=master)](https://travis-ci.org/reergymerej/react-smart-text)


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


## Usage

Render a plain string within `<SmartText />` and substrings matching a pattern
will be replaced by a custom component.

### Props

**regex** - Provide a regular expression describing the substring(s) you wish to
replace.

**component** - The component regex matches will be replaced with. Instances will be passed the props **result** (RegExp.exec result) and **text** to allow for additional logic.

**outerComponent (optional)** - The outer component all other nodes will be
contained within.  Thid defaults to a plain `<div />`.


## Installation

`yarn add react-smart-text`


## Test

`yarn test`





---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
