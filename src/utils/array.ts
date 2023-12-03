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
