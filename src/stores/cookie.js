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

    // remove quotes from stringified id
    cookies[key] = (decodeURIComponent(value) || '').replace(/"/g, '')
  }

  return cookies
}

function get(opts = {}) {
  const { key, cookie } = opts
  const cookies = getAll(cookie)

  return cookies[key]
}

function browserSet({ name, value, expires, domain, path, secure }) {
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
    (domain ? '; domain=' + domain : '') +
    (secure ? '; secure' : '')
}

function set(opts = {}) {
  const { key, id, mutate, domain } = opts
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
    browserSet({ name: key, value: id, path: '/', domain })
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
