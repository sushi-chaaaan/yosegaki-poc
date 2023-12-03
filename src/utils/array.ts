export const asyncFlatMap = async <Item, Res>(
  arr: Item[],
  callback: (value: Item, index: number, array: Item[]) => Promise<Res>,
) => {
  const a = await Promise.all(arr.map(callback))
  return a.flat()
}

export const getFirstIndex = <T>(arr: T[]) => {
  return arr.length > 0 ? arr[0] : null
}

/**
 * Splits an array into chunks based on a given modulus value.
 * Each chunk will contain elements from the original array that have the same index modulo the modulus value.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to be chunked.
 * @param {number} mod - The modulus value used for chunking.
 * @returns {T[][]} - An array of chunks, where each chunk contains elements with the same index modulo the modulus value.
 * @example
 * chunkArrayWithIndexMod([4, 1, 3, 6], 3) // [[4, 6], [1], [3]]
 * chunkArrayWithIndexMod([4, 1, 3, 6], 2) // [[4, 3], [1, 6]]
 */
export const chunkArrayWithIndexMod = <T>(arr: T[], mod: number): T[][] => {
  return arr.reduce((acc: T[][], cur, index) => {
    const i = index % mod
    if (!acc[i]) {
      acc[i] = []
    }
    acc[i].push(cur)
    return acc
  }, [])
}
