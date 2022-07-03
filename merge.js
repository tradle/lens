const extend = require('lodash/extend')
const clone = require('lodash/clone')
const omit = require('lodash/omit')
const cloneDeep = require('lodash/cloneDeep')
const { TYPE } = require('@tradle/constants')
const validate = require('@tradle/validate-model')
const LENS_TYPE = 'tradle.Lens'
const override = (fromModel, fromLens) => fromLens.slice()
const mergeUniq = (fromModel=[], fromLens=[]) => uniqStrings(fromModel.concat(fromLens))
const groupCombiner = {
  required: mergeUniq,
  hidden: mergeUniq,
  viewCols: override,
  gridCols: override,
  editCols: override
}

const FORBIDDEN_METADATA = [
  'type',
  'range',
  'ref',
  'inlined'
]

module.exports = {
  merge,
  mergeProperties,
  mergeProperty
}

function merge ({ models, model, lens }) {
  if (!model) {
    model = models[lens.model]
  }

  if (!model) {
    throw new Error(`model not found: ${lens.model}`)
  }

  expect('lens.model', model.id, lens.model)
  expect(TYPE, LENS_TYPE, lens[TYPE])

  const merged = omit(model, ['properties'])
  if (lens.properties) {
    merged.properties = mergeProperties({ model, lens })
  } else {
    merged.properties = cloneDeep(model.properties)
  }

  for (let group in groupCombiner) {
    if (!lens[group]) continue

    const combine = groupCombiner[group]
    merged[group] = combine(model[group], lens[group])
  }

  validate.model(merged)
  validate.refs({ models, model: merged })
  return merged
}

function mergeProperties ({ model, lens }) {
  const properties = {}
  for (let propertyName in model.properties) {
    properties[propertyName] = mergeProperty({ model, lens, propertyName })
  }

  return properties
}

function mergeProperty ({ model, lens, propertyName }) {
  const prop = model.properties[propertyName]
  const propLens = lens.properties[propertyName]
  if (propLens) {
    const forbidden = FORBIDDEN_METADATA.filter(mProp => propLens[mProp])
    if (forbidden.length) {
      throw new Error(`lens cannot override property metadata: ${forbidden.join(', ')}`)
    }

    return extend({}, prop, propLens)
  }

  return clone(prop)
}

function uniqStrings (arr) {
  const map = {}
  for (const item of arr) {
    map[item] = true
  }

  return Object.keys(map)
}

function expect (name, expected, actual) {
  if (expected !== actual) {
    throw new Error(`expected ${name} to be: ${expected}, got: ${actual}`)
  }
}
