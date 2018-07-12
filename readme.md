<p align="center">
  <a href="https://www.npmjs.com/package/anonymous-id"><img src="./docs/images/banner.png?cache=1" alt="anonymousId" /></a>
</p>

<p align="center">
  A tiny utility for working with anonymous ids<br/>
  on the server and in the browser.
</p>
<br/>

<p align="center">
  <a href="https://unpkg.com/anonymous-id/dist/anonymous-id.min.js">
    <img src="https://img.badgesize.io/https://unpkg.com/anonymous-id/dist/anonymous-id.min.js?compression=gzip&amp;label=anonymous--id&cache=2">
  </a>
  <a href="https://www.npmjs.com/package/anonymous-id">
    <img src="https://img.shields.io/npm/v/anonymous-id.svg?maxAge=3600&label=anonymous-id&colorB=007ec6">
  </a>
</p>
<br/>


### Getting Started

#### Installation

Install with npm:

```shell
npm install --save anonymous-id
```

Or with yarn:

```shell
yarn add anonymous-id
```

#### Examples

```javascript
import anonymousId from 'anonymous-id'

anonymousId() // generate or pull id from cookie/localStorage

anonymousId('exampleId') // call the function with string or number to set as id, otherwise pass in options
```

### Usage

#### Get & Set

```javascript
import { get, set } from 'anonymous-id'

set({ key: 'my_anon_id' }) // ajs-C1E42A94-FCE2-4851-87DD-695F576C5368 -> cookie or localStorage

get({ key: 'my_anon_id' }) // cookie or localStorage -> ajs-C1E42A94-FCE2-4851-87DD-695F576C5368
```

#### Options

These are the base options that can be passed in to both get and set functions:

```javascript
anonymousId({
  debug: true, // log operations to stdout
  preset: String, // prefix/generateId/stores to use
  cookie: String, // cookie string to use (browser default is document.cookie)
  localStorage: Object // Storage object to use (browser default is window.localStorage)
})
```

For setting anonymous ids, you can specify an `id` field which will pass the options to `setAnonymousId()`. If you don't set the `id` option, then `getAnonymousId()` will be called with the options:

```javascript
const id = await promptEmailFromUser()

anonymousId({ id })
```

And for getting anonymous ids, you can pass control if the preset tries to persist data:

```javascript
console.log(document.cookie) // 'a=true'

const { cookie } = anonymousId({ persist: false })

console.log(document.cookie) // 'a=true'
console.log(cookie) // 'a=true; ajs_anonymous_id=ajs-B31C9E91-D741-4146-913B-0E80199648D0'
```

### Contributing

All contributions are super welcome! `anonymous-id` is [MIT-licensed](./license).
