
export function grupeBy<A extends any, R = any>(arr: A[], callback: (item: A) => keyof R): Record<keyof R, Array<A>> {
  if (arr.length === 0) {
    return {} as Record<keyof R, Array<A>>
  }
  return arr.reduce((acc, item) => {
    const key = callback(item)
    return {
      ...acc,
      [key]: acc[key] ? [...acc[key], item] : [item],

    }
  }, {} as Record<keyof R, Array<A>>)
}