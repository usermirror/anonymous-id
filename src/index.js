const getAnonymousId = require('./get')
const setAnonymousId = require('./set')

function anonymousId(opts) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    return setAnonymousId({ id: opts })
  } else if (typeof opts === 'object') {
    if (typeof opts.id !== 'undefined') {
      return setAnonymousId(opts)
    } else {
      return getAnonymousId(opts)
    }
  } else {
    return getAnonymousId()
  }
}

anonymousId.get = getAnonymousId
anonymousId.set = setAnonymousId

module.exports = anonymousId
