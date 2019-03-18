import { has, get, set, unset, update } from '../src/carbo'

// Test object
const data = {
  envelopes: {
    '01234567-abcd-4abc-8def-0123456789ab': {
      envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
      envelopeName: 'Hello'
    }
  },
  context: {
    view: 'templates',
    visible: true
  }
}

// Has
describe('Has', () => {
  // Test if true when present
  test('When value is present it returns true', () => {
    // Check if has key
    const success = has(data, 'context')

    // Match result should be true
    expect(success).toBe(true)
  })

  // Test if false if not present
  test('When value is not present it returns false', () => {
    // Check if has key
    const success = has(data, 'random')

    // Match result should be false
    expect(success).toBe(false)
  })
})

// Get
describe('Get', () => {
  // Test if value is returned when present
  test('When value is present it returns the value', () => {
    // Get based on key
    const value = get(data, 'context')

    // Match result should be the nested data
    expect(value).toEqual({
      view: 'templates',
      visible: true
    })
  })

  // Test if undefined is returned when not present
  test('When value is not present it returns undefined', () => {
    // Get based on key
    const value = get(data, 'random')

    // Match result should be undefined
    expect(value).toBeUndefined()
  })
})

// Set
describe('Set', () => {
  // Test if value is replaced when present
  test('When key is present, the value is replaced with the new value', () => {
    // Get the next object based on replacing the key
    const next = set(data.context, 'visible', false)

    // Match result should have the replaced key
    expect(next).toEqual({
      view: 'templates',
      visible: false
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data.context)
  })

  // Test if value is added when not present
  test('When key is not present, the key value pair is added to the object', () => {
    // Get the next object based on adding the key
    const next = set(data.context, 'count', 4)

    // Match result should have the added key
    expect(next).toEqual({
      view: 'templates',
      visible: true,
      count: 4
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data.context)
  })

  // Test if reference is the same if not changed
  test('When value is not changed, the original object is returned', () => {
    // Get the next object based on adding the key
    const next = set(data.context, 'visible', true)

    // Make sure the reference is not changed
    expect(next).toBe(data.context)
  })
})

// Remove
describe('Unset', () => {
  // Test if value is removed when present
  test('When key is present, the key value pair is removed from the object', () => {
    // Get the next object based on removing the key
    const next = unset(data.context, 'visible')

    // Match result should be true
    expect(next).toEqual({
      view: 'templates'
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data.context)
  })

  // Test namespace
  test('When the key is not preset, the original object is returned', () => {
    // Get the next object
    const next = unset(data.context, 'count')

    // Make sure the reference is returned
    expect(next).toBe(data.context)
  })
})

// Update
describe('Update', () => {
  // Test if value is replaced when present
  test('When key is present, the value is replaced with the returned value', () => {
    // Get the next object based on replacing the key
    const next = update(data.context, 'visible', v => !v)

    // Match result should have the replaced key
    expect(next).toEqual({
      view: 'templates',
      visible: false
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data.context)
  })

  // Test if value is added when not present
  test('When key is not present, the key returned value pair is added to the object', () => {
    // Get the next object based on adding the key
    const next = update(data.context, 'step', v => String(v))

    // Match result should have the added key
    expect(next).toEqual({
      view: 'templates',
      visible: true,
      step: 'undefined'
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data.context)
  })

  // Test if reference is the same if not changed
  test('When value is not changed, the original object is returned', () => {
    // Get the next object based on adding the key
    const next = set(data.context, 'visible', true)

    // Make sure the reference is not changed
    expect(next).toBe(data.context)
  })
})

// Has in path
describe('Has Path', () => {
  // Test if true when present
  test('When value in the path is present, it returns true', () => {
    // Check if has path
    const success = has(data, ['envelopes', '01234567-abcd-4abc-8def-0123456789ab'])

    // Match result should be true
    expect(success).toBe(true)
  })

  // Test if false when not present
  test('When value in the path is not present, it returns false', () => {
    // Check if has key
    const success = has(data, ['envelopes', '01234567-abcd-4abc-8def-0123456789ac'])

    // Match result should be false
    expect(success).toBe(false)
  })
})

// Get in path
describe('Get Path', () => {
  // Test if value is returned when present
  test('When value in the path is present, it returns the value', () => {
    // Get based on key
    const value = get(data, ['context', 'view'])

    // Match result should be the right value
    expect(value).toEqual('templates')
  })

  // Test if undefined is returned when not present
  test('When value in the path is not present, it returns undefined', () => {
    // Get based on key
    const value = get(data, ['envelopes', '01234567-abcd-4abc-8def-0123456789ac'])

    // Match result should be undefined
    expect(value).toBeUndefined()
  })
})

// Set in path
describe('Set Path', () => {
  // Test if value is replaced when present
  test('When the value is present, the value is replaced with the new value', () => {
    // Get the next object based on the path
    const next = set(data, ['context', 'visible'], false)

    // Match result should have the replaced value
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates',
        visible: false
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data)
  })

  // Test if value is added when not present
  test('When the value is not preset, the key and value are added', () => {
    // Get the next object based on the path
    const next = set(data, ['context', 'count'], 3)

    // Match result should have the new key and value
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates',
        visible: true,
        count: 3
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data)
  })

  // Test if path is added when not present
  test('When the path is not preset, the path and value are added', () => {
    // Get the next object based on the path
    const next = set(data, ['context', 'tutorial', 'step'], 4)

    // Match result should have the new path and value
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates',
        visible: true,
        tutorial: {
          step: 4
        }
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data)
  })

  // Test if reference is the same if not changed
  test('When value is not changed, the original object is returned', () => {
    // Get the next object based on adding the key
    const next = set(data, ['context', 'visible'], true)

    // Make sure the reference is not changed
    expect(next).toBe(data)
  })
})

// Remove in path
describe('Unset Path', () => {
  // Test if value is removed when present
  test('When path is present, the last key value pair is removed from the object', () => {
    // Get the next object based on removing the path
    const next = unset(data, ['context', 'visible'])

    // Match result should be true
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates'
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data.context)
  })

  // Test namespace
  test('When the path is not preset, the original object is returned', () => {
    // Get the next object
    const next = unset(data, ['context', 'visible', 'something'])

    // Make sure the reference is returned
    expect(next).toBe(data)
  })
})

// Update in path
describe('Update Path', () => {
  // Test if value is replaced when present
  test('When the value is present, the value is replaced with the returned value', () => {
    // Get the next object based on the path
    const next = update(data, ['context', 'visible'], v => !v)

    // Match result should have the replaced value
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates',
        visible: false
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data)
  })

  // Test if value is added when not present
  test('When the value is not preset, the key and returned value are added', () => {
    // Get the next object based on the path
    const next = update(data, ['context', 'step'], v => String(v))

    // Match result should have the new key and value
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates',
        visible: true,
        step: 'undefined'
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data)
  })

  // Test if path is added when not present
  test('When the path is not preset, the path and returned value are added', () => {
    // Get the next object based on the path
    const next = update(data, ['context', 'tutorial', 'step'], () => 4)

    // Match result should have the new path and value
    expect(next).toEqual({
      envelopes: {
        '01234567-abcd-4abc-8def-0123456789ab': {
          envelopeId: '01234567-abcd-4abc-8def-0123456789ab',
          envelopeName: 'Hello'
        }
      },
      context: {
        view: 'templates',
        visible: true,
        tutorial: {
          step: 4
        }
      }
    })

    // Make sure the reference is not changed
    expect(next).not.toBe(data)
  })

  // Test if reference is the same if not changed
  test('When value is not changed, the original object is returned', () => {
    // Get the next object based on adding the key
    const next = update(data, ['context', 'visible'], v => v)

    // Make sure the reference is not changed
    expect(next).toBe(data)
  })
})
