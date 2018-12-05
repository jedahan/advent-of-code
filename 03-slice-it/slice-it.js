const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const read = async filename => {
  const bytes = await readFile(filename)
  const input = bytes.toString().split('\n')
  input.pop() // deal with extra newline
  return { input }
}

const parse = cut => {
  let [_, x, y, w, h, ..._r] = cut.match(/[\d+]\ @\ (\d+),(\d+): (\d+)x(\d+).*/)
  return [x, y, w, h]
}

// Gets the maximum length and width
const size = ({input}) => {
  const [l, w] = input.reduce(([ml, mw], cut) => {
    let [x, y, w, h] = parse(cut)
    if (x+w > ml) mw = x+w
    if (y+h > mw) ml = y+h
    return [ml, mw]
  }, input[0])
  return {l, w}
}

const reduce = ({input}) => {
  const {l, w} = size({input})
  const fabric = new Array(l * w)

  for (cut of input) {
    let [x, y, w, h] = parse(cut)
    for (let yo = 0; yo < h; yo++) {
      for (let xo = 0; xo < w; xo++) {
        const index = ((y + yo) * w) + (x + xo)

        if (fabric[index] === undefined)
          fabric[index] = false
        else
          fabric[index] = true
      }
    }
  }

  console.log(`Filtering ${fabric.length} values`)

  return Object.keys(fabric)
    .reduce((sum, index) => sum + (fabric[index] ? 1 : 0), 0)
}

read('input').then(reduce).then(console.log)
