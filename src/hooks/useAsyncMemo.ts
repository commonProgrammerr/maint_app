import { DependencyList, useEffect, useRef, useState } from "react";

type Cache<T> = {
  [ḱey: string]: T
}

type AsyncState<T> = {
  loading: boolean,
  result?: T
  error?: Error
}

type HookOptions<T> = {
  onSuceed?: (data: T) => void
  onFail?: (err: Error) => void
  effect?: (key: string, ref: Cache<T>) => (void | (() => void))
  clear_timeout?: number
}

function getDepsKey(deps: DependencyList): string {
  return deps.map(dep => String(dep)).reduce((prev, curr) => {
    return `${prev}$${curr}`
  }, '')
}

export function useAsyncMemo<T>(fn: () => Promise<T>, deps: DependencyList, opts?: HookOptions<T>) {
  const cacheRef = useRef<Cache<T>>({})
  const keyRef = useRef('')
  const [state, setState] = useState<AsyncState<T>>({
    loading: true
  })
  const onFail = opts?.onFail
  const onSuceed = opts?.onSuceed
  const time_key = Math.round(new Date().getTime() / (opts?.clear_timeout || 6e4))
  const key = `${getDepsKey(deps)}@${time_key}`

  useEffect(() => {
    return opts?.effect?.(key, cacheRef.current)
  })

  if (key === keyRef.current) {
    return state
  }

  if (!(key in cacheRef.current)) {
    keyRef.current = key
    setState({
      loading: true
    })
    fn().catch(error => {
      onFail?.(error)
      setState({
        loading: false,
        error
      })
    }).then(value => {
      cacheRef.current[key] = value as T
      keyRef.current = key
      onSuceed?.(value as T)
      setState({
        loading: false,
        result: value as T
      })
    })
    return state
  } else {
    keyRef.current = key
    setState({
      loading: false,
      result: cacheRef.current[key]
    })
  }

  return state
}