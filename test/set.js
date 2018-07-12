const test = require('ava')
const { set } = require('../lib')

test(t => {
  const { cookie, localStorage } = set({ id: 'a' })

  t.is(cookie, `ajs_anonymous_id=a`)
  t.is(localStorage.ajs_anonymous_id, `a`)
})
