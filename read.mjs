import { readFile } from 'fs'
import { promisify } from 'util'

export default async function(filename) {
  const bytes = await promisify(readFile)(filename)
  const input = bytes.toString().split('\n').map(parseFloat)
  input.pop() // deal with extra newline at the end
  return { input }
}
