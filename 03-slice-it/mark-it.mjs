import read from '../read'

const parse = cut => {
  let [_, i, x, y, w, h, ..._r] = cut.match(/^#(\d+)\ @\ (\d+),(\d+): (\d+)x(\d+).*/)
  return [i, x, y, w, h].map(parseFloat)
}

// Gets the maximum length and width
const size = ({input}) => {
  const [width, height] = input.reduce(([mw, mh], cut) => {
    let [_, x, y, w, h] = parse(cut)
    if (x+w > mw) mw = x+w
    if (y+h > mh) mh = y+h
    return [mw, mh]
  }, [-Infinity, -Infinity])
  return {width, height}
}

const print = ({fabric, width}) => {
  for (let i=0; i < fabric.length; i++) {
    if (i % width === 0) console.log()
    process.stdout.write(util.format('%s', fabric[i] || '.'))
  }
  console.log()
}

const reduce = ({input}) => {
  const {width, height} = size({input})
  const fabric = new Array(width * height)
  const clean = new Set()

  for (cut of input) {
    let [i, x, y, w, h] = parse(cut)
    clean.add(i)
    for (let yo = 0; yo < h; yo++) {
      for (let xo = 0; xo < w; xo++) {
        const index = ((y + yo) * width) + (x + xo)

        if (fabric[index] === undefined) {
          fabric[index] = i
        } else {
          clean.delete(fabric[index])
          fabric[index] = 'x'
          clean.delete(i)
        }
      }
    }
  }

  return {
    clean: Array.from(clean)[0],
    overlapping: Object.keys(fabric).reduce((sum, index) => sum + (fabric[index] === 'x' ? 1 : 0), 0)
  }
}

read('input').then(reduce).then(console.log)
