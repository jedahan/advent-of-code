import read from '../read'

const has = what => counts => counts.includes(what) ? 1 : 0
const checksums = [has(2), has(3)]

// Take a string, and give back a 26 character array of all the counts of the letters
const count = string => string.split('')
  .reduce((counts, letter) => {
    counts[letter.charCodeAt(0) - 97]++
    return counts
  }, new Array(26).fill(0))

const reduce = ({input}) => {
  const sums = input
    .map(count)
    .map(count => checksums.map(checksum => checksum(count)))
    .reduce((sums, sum) => sums.map((_, i) => sums[i] + sum[i]), [0, 0])

  return sums[0] * sums[1]
}

read('input')
  .then(reduce)
  .then(console.log)
