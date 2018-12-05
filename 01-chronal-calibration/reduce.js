const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const read = async filename => {
  const bytes = await readFile(filename)
  // this returns an array of floats, but with one extra NaN at the end
  const input = bytes.toString().split('\n').map(parseFloat)
  return { input }
}

const reduce = ({input}) => {
  // (delta || 0) deals with the nand
  return input.reduce((sum, delta) => sum += (delta || 0), 0)
}

read('input')
  .then(reduce)
  .then(console.log)
