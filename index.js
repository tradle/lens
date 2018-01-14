
const { merge } = require('./merge')
const validate = ({ models, model, lens }) => {
  // defer to merge to validate
  merge({ models, model, lens })
}

module.exports = {
  merge,
  validate
}
