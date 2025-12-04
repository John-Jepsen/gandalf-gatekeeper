import { Dispatch, SetStateAction, useEffect, useState } from "react"

function getInitialValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue

  try {
    const stored = window.localStorage.getItem(key)
    if (stored) return JSON.parse(stored) as T
  } catch (error) {
    console.warn(`Failed to read persisted value for "${key}"`, error)
  }

  return initialValue
}

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getInitialValue(key, initialValue))

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to persist value for "${key}"`, error)
    }
  }, [key, value])

  const setPersistentValue: Dispatch<SetStateAction<T>> = (update) =>
    setValue((prev) =>
      typeof update === "function" ? (update as (prevState: T) => T)(prev) : update
    )

  return [value, setPersistentValue]
}
