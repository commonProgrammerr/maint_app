
export function grupeBy<A extends any, R = any>(arr: A[], callback: (item: A) => keyof R) {
  return arr.reduce((acc, item) => {
    const key = callback(item)
    return {
      ...acc,
      [key]: acc[key] ? [...acc[key], item] : [item],

    }
  }, {} as Record<keyof R, Array<A>>)
}