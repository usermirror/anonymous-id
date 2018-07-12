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

function set(opts = {}) {
  const { key, id, mutate } = opts
  let { cookie = '' } = opts

  if (!mutate) {
    cookie = `${cookie}`
  }

  if (cookie.length > 0 && cookie[cookie.length - 1] !== ';') {
    cookie += '; '
  }

  cookie += `${key}=${encodeURIComponent(id)}`

  return cookie
}

module.exports = {
  get,
  set
}
