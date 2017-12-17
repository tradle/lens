
const test = require('tape')
const models = require('@tradle/merge-models')()
  .add(require('@tradle/models').models)
  .add(require('@tradle/custom-models'))
  .get()

const { merge } = require('../')
const valid = require('./fixtures/valid')

test('basic', t => {
  valid.forEach(lens => {
    t.doesNotThrow(() => merge({ models, lens, strict: false }))
  })

  t.end()
})
