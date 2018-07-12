const test = require('ava')
const anonymousId = require('../lib')

// test get
test(t => {
  const id = anonymousId()

  t.truthy(id)
})

// test set
test(t => {
  const { cookie } = anonymousId('testemail')

  t.is(cookie, 'ajs_anonymous_id=testemail')
})
