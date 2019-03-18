# Carbo

## Super fast and simple immutable object helpers

Carbo is a super fast and simple set of helpers for immutable data. It runs in the browser, or on the server using node.js.

### Setup

```bash
yarn add carbo
```

or

```bash
npm install --save carbo
```

### Usage

Before you start import the library

```javascript
import { has, get, set, unset, update } from 'carbo'
```

#### Basic usage

```javascript
// Setup a new bus with no buffer
const obj = { name: 'John Doe', age: 25, work: { company: 'ACME', title: 'CEO' } }

// Data published can be anything
const obj1 = set(obk, { name: 'Jane Doe' })

// Setup a subscriber
const ubsubscribe = bus.subscribe((data, topic) => {
  console.log(data, topic) // { test: true } "topic"
})

// Publish some data
chan.publish(context)

// Cleanup
unsubsribe()
```

## License

[MIT](LICENSE)
