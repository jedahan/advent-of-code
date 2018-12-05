const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const read = async filename => {
  const bytes = await readFile(filename)
  const input = bytes.toString().split('\n').map(parseFloat)
  input.pop() // deal with extra newline at the end
  return { input }
}

const reduce = ({input}) => {
  const freqs = [0]

  for (let index = 0; true; index = (index + 1) % input.length) {
    const freq = freqs[freqs.length-1] + input[index]
    if (freqs.includes(freq)) return { repeated: freq }
    freqs.push(freq)
  }
}

read('input')
  .then(reduce)
  .then(console.dir)
