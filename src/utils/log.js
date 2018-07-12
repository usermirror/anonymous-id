module.exports = ({ debug }) => (...args) => {
  if (debug) {
    const [msg, ...otherArgs] = args

    console.log(`anonymousId.${msg}`, ...otherArgs)
  }
}
