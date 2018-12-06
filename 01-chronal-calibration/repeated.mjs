import read from '../read'

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
