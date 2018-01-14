
const test = require('tape')
const models = require('@tradle/merge-models')()
  .add(require('@tradle/models').models)
  .add(require('@tradle/custom-models'))
  .get()

const { merge, validate } = require('../')
const valid = require('./fixtures/valid')
const invalid = require('./fixtures/invalid')

test('basic', t => {
  valid.forEach(lens => {
    t.doesNotThrow(() => merge({ models, lens }))
    t.doesNotThrow(() => validate({ models, lens }))
  })

  invalid.forEach(({ lens, error }) => {
    t.throws(() => merge({ models, lens }), error)
    t.throws(() => validate({ models, lens }), error)
  })

  t.end()
})
