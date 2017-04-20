import * as parser from './parser'

describe('parser', () => {
  describe('getMatches', () => {
    describe('with no matches', () => {
      it('should return the string in an array', () => {
        const input = 'asdf'
        const regex = /qwer/g
        const regularExpressions = [regex]
        const out = parser.getMatches(input, regularExpressions)
        expect(out).toEqual([input])
      })
    })

    it('should return an array of plain strings and "match objects"', () => {
      const input = '012qwer1890qwer267890'
      const regex = /qwer[12]/g
      const regularExpressions = [regex]
      const out = parser.getMatches(input, regularExpressions)
      regex.lastIndex = 0
      expect(out).toEqual([
        '012',
        {
          regex,
          execResult: regex.exec(input),
        },
        '890',
        {
          regex,
          execResult: regex.exec(input),
        },
        '67890',
      ])
    })

    it('should work for multiple matches', () => {
      const input = 'xxxredxxxbluexxxredxxxblue'
      const red = /red/g
      const blue = /blue/g
      const regularExpressions = [red, blue]
      const out = parser.getMatches(input, regularExpressions)
      red.lastIndex = 0
      blue.lastIndex = 0
      expect(out).toEqual([
        'xxx',
        {
          regex: red,
          execResult: red.exec(input),
        },
        'xxx',
        {
          regex: blue,
          execResult: blue.exec(input),
        },
        'xxx',
        {
          regex: red,
          execResult: red.exec(input),
        },
        'xxx',
        {
          regex: blue,
          execResult: blue.exec(input),
        },
      ])
    })
  })
})
