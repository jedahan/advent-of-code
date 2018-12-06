import read from '../read'

const reduce = ({input}) => {
  // (delta || 0) deals with the nand
  return input.reduce((sum, delta) => sum += (delta || 0), 0)
}

read('input')
  .then(reduce)
  .then(console.log)
