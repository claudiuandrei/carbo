// Refine object to be more specific
type Object = { [key: string]: any }

// Check if object has property
export const has = (data: Object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(data, key)

// Get the value from an object
export const get = (data: Object, key: string): any => data[key]

// Create a new object without property by key
export const unset = (data: Object, key: string): Object => {
  // Start building the output
  const output: Object = {}

  // Unset everything into the output
  const keys: Array<string> = Object.keys(data)

  // Iterate over the object
  for (let index: number = 0; index < keys.length; index += 1) {
    // Get the key
    const k: string = keys[index]

    // Copy if not matching
    if (k !== key) {
      output[k] = data[k]
    }
  }

  // Return the output
  return output
}

// Update the value based on a function
export const set = (data: Object, key: string, value: any): Object => {
  // Get a new output by removing the key
  const output: Object = unset(data, key)

  // Update the value
  output[key] = value

  // Return the output
  return output
}

// Seek a property in path
export const seek = (data: Object, path: Array<string>): [boolean, any?] => {
  // Load the target
  let needle: any = data

  // Iterate over the object
  for (let index = 0; index < path.length; index += 1) {
    // Get the key
    const key: string = path[index]

    // We don't have any nested values
    if (!has(needle, key)) {
      return [false]
    }

    // Load the next step
    needle = needle[key]
  }

  // We are here, we are good
  return [true, needle]
}

// Create a new object without property by path
export const recast = (data: Object, path: Array<string>): [Object, Object] => {
  // Start the nested as output
  const output: Object = unset(data, path[0])

  // Create pointers for traversal
  let input: any = data
  let needle: Object = output

  // Traverse the tree
  for (let index: number = 0; index < path.length - 1; index += 1) {
    // Get the key
    const key: string = path[index]

    // Move the needle
    input = has(input, key) ? input[key] : {}

    // Output update
    needle[key] = unset(input, path[index + 1])

    // Advance output pointerƒ
    needle = needle[key]
  }

  // Return the output
  return [output, needle]
}
