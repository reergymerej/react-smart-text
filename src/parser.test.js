import * as parser from './parser'

describe('parser', () => {
  describe('getMatches', () => {
    describe('with no matches', () => {
      it('should return the string in an array', () => {
        const input = 'asdf'
        const regex = /qwer/g
        const out = parser.getMatches(input, regex)
        expect(out).toEqual([input])
      })
    })

    it('should return an array of plain strings and regex matches', () => {
      const input = '012qwer1890qwer267890'
      const regex = /qwer[12]/g
      const out = parser.getMatches(input, regex)
      regex.lastIndex = 0
      expect(out).toEqual([
        '012',
        regex.exec(input),
        '890',
        regex.exec(input),
        '67890',
      ])
    })
  })
})
