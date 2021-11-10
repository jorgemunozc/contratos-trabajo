export function deepCloneArray<T>(target: T): T {
  return JSON.parse(JSON.stringify(target))
}
