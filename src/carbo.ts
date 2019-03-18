import * as base from './base'

// Refine object to be more specific
type Object = { [key: string]: any }

// Union for key | array
type Path = string | Array<string>

// Check if it has in a path
export const has = (data: Object, path: Path): boolean =>
  typeof path === 'string' ? base.has(data, path) : base.seek(data, path)[0]

// Check what we have in path
export const get = (data: Object, path: Path): any =>
  typeof path === 'string' ? base.get(data, path) : base.seek(data, path)[1]

// Remove what we have in path
export const unset = (data: Object, path: Path): Object => {
  // Check if the value is there before unsetting
  if (!has(data, path)) {
    return data
  }

  // Remove the data
  return typeof path === 'string' ? base.unset(data, path) : base.recast(data, path)[0]
}

// Update the value based on a function
export const update = (data: Object, path: Path, updater: (input: any) => any): Object => {
  // Load the current value
  const current = get(data, path)

  // Load the value from the input
  const value = updater(current)

  // Don't change if the data is the same
  if (current === value) {
    return data
  }

  // Set the key if we have a string
  if (typeof path === 'string') {
    return base.set(data, path, value)
  }

  // Load the data
  const [output, needle] = base.recast(data, path)

  // Get the key
  const key: string = path[path.length - 1]

  // Set the value
  needle[key] = value

  // Return the output
  return output
}

// Update with a value
export const set = (data: Object, path: Path, value: any): Object => update(data, path, () => value)
