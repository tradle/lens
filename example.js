/* eslint-disable no-console, no-magic-numbers */

const { models } = require('@tradle/models')
const { merge } = require('./')
const model = {
  type: 'tradle.Model',
  id: 'my.custom.AddressForm',
  title: 'Your Address',
  subClassOf: 'tradle.Form',
  properties: {
    buildingName: {
      type: 'string'
    },
    what3words: {
      type: 'string',
      description: 'Your three-word address on https://map.what3words.com'
    }
  },
  required: ['what3words']
}

const lens = {
  _t: 'tradle.Lens',
  id: 'my.custom.AddressFormLens',
  model: 'my.custom.AddressForm',
  properties: {
    what3words: {
      // customize a field by adding / overriding model attributes
      title: 'Address',
      description: 'your address on https://map.what3words.com, e.g. parade.help.bleat'
    }
  },
  required: ['buildingName', 'what3words'],
  hidden: []
}

const merged = merge({ models, model, lens })
console.log(JSON.stringify(merged, null, 2))

// {
//   "type": "tradle.Model",
//   "id": "my.custom.AddressForm",
//   "title": "Your Address",
//   "subClassOf": "tradle.Form",
//   "required": [
//     "what3words",
//     "buildingName"
//   ],
//   "properties": {
//     "buildingName": {
//       "type": "string"
//     },
//     "what3words": {
//       "type": "string",
//       "description": "your address on https://map.what3words.com, e.g. parade.help.bleat",
//       "title": "Address"
//     }
//   },
//   "hidden": []
// }
