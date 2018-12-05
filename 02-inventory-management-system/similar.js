const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const read = async filename => {
  const bytes = await readFile(filename)
  const input = bytes.toString().split('\n')
  input.pop() // deal with extra newline
  return { input }
}

const reduce = ({input}) => {
  return input.sort().some((first, i) => {
    let offby = 0
    let missing = ''
    let second = input[i + 1]
    first.split('').forEach((letter, index) => {
      if (second[index] !== letter) {
        offby++
        missing = letter
      }
    })
    if (offby === 1) {
      console.log(first.replace(missing, ''))
      return true
    }
  })
}

read('input').then(reduce)
