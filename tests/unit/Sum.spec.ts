import sum from '../../src/Example'

describe('the sum function should work properly', () => {
  it('should add numbers', () => {
    const a = 10
    const b = 5
    expect(sum(a, b)).toEqual(15)
  })
  it('should add strings', () => {
    const a = '10'
    const b = '5'
    expect(sum(a, b)).toEqual(15)
  })
  it('should add strings and numbers', () => {
    const a = '10'
    const b = 5
    expect(sum(a, b)).toEqual(15)
  })
})
