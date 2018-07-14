function getAll(cookie = '') {
  const cookieParts = cookie.split('; ')
  const cookies = {}

  if (
    cookieParts.length === 0 ||
    (cookieParts.length === 1 && cookieParts[0] === '')
  ) {
    return cookies
  }

  for (let i = 0; i < cookieParts.length; i++) {
    const [key, value] = cookieParts[i].split('=')

    cookies[key] = decodeURIComponent(value)
  }

  return cookies
}

function get(opts = {}) {
  const { key, cookie } = opts
  const cookies = getAll(cookie)

  return cookies[key]
}

function browserSet(name, value, expires, path, secure) {
  let valueToUse

  if (value !== undefined && typeof value === 'object')
    valueToUse = JSON.stringify(value)
  else valueToUse = encodeURIComponent(value)

  document.cookie =
    name +
    '=' +
    valueToUse +
    (expires ? '; expires=' + new Date(expires).toUTCString() : '') +
    '; path=' +
    (path || '/') +
    (secure ? '; secure' : '')
}

function set(opts = {}) {
  const { key, id, mutate } = opts
  let { cookie } = opts
  let isBrowser = false

  try {
    cookie = document.cookie
    isBrowser = true
  } catch (err) {
    // silence dom error
    cookie = ''
  }

  if (isBrowser) {
    browserSet(key, id, null, '/', false)
  }

  if (!mutate) {
    cookie = `${cookie}`
  }

  const newCookie = `${key}=${encodeURIComponent(id)}`

  return [cookie, newCookie].filter(Boolean).join('; ')
}

module.exports = {
  get,
  set
}
