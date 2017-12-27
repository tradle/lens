const omit = require('object.omit')
const shallowClone = require('xtend')
const { TYPE } = require('@tradle/constants')
const validate = require('@tradle/validate-model')
// const { metadataProperties } = validate.property
// const metadataPropertiesObj = toObject(metadataProperties)
const LENS_TYPE = 'tradle.Lens'
const combineOverride = (fromModel, fromLens) => fromLens.slice()
const combineMerge = (fromModel=[], fromLens=[]) => uniqStrings(fromModel.concat(fromLens))
const groupCombiner = {
  required: combineMerge,
  hidden: combineMerge,
  viewCols: combineOverride
}

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
  merged.properties = mergeProperties({ model, lens })
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
  return propLens ? shallowClone(prop, propLens) : shallowClone(prop)
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
