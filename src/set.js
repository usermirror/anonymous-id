const Log = require('./utils/log')
const presets = require('./utils/presets')
const { set: storeSetters } = require('./stores')

module.exports = function set(opts = {}) {
  let { id, debug, preset = 'segment', cookie, localStorage } = opts
  let log = Log({ debug })

  if (!presets[preset]) {
    // TODO: notify unknown preset
    preset = 'segment'
  }

  const { generateId, key, stores, mutate } = presets[preset]

  if (!id) {
    id = generateId()
    log(`set: generated new id {id: "${id}"}`)
  } else {
    log(`set: using {id: "${id}"}`)
  }

  let result

  if (!localStorage) {
    try {
      localStorage = window.localStorage
    } catch (err) {
      // silence window error
    }
  }

  try {
    result = storeId({ debug, key, id, stores, mutate, cookie, localStorage })
    result.status = 'success'
  } catch (error) {
    log(`set: error`, error)
    result = {
      status: 'error',
      error
    }
  }

  return result
}

function storeId(opts = {}) {
  const { debug, key, id, stores, mutate, cookie, localStorage } = opts
  const result = {}
  const log = Log({ debug })

  for (const store of stores) {
    try {
      const storeSet = storeSetters[store]
      const value = storeSet({ key, id, mutate, cookie, localStorage })

      if (value) {
        log(`set.${store}: success {id: "${id}"}`)
        result[store] = value
      } else {
        log(`set.${store}: fail {id: "${id}"}`)
      }
    } catch (err) {
      // TODO: Handle unknown error trying to store id
    }
  }

  return result
}
