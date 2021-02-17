import _ from 'lodash'

const sum = (a: number | string, b: number | string): number => {
  let newa: number
  let newb: number
  if (typeof a === 'string') {
    newa = _.parseInt(a)
  } else {
    newa = a
  }
  if (typeof b === 'string') {
    newb = _.parseInt(b)
  } else {
    newb = b
  }
  return _.add(newa, newb)
}

export default sum
