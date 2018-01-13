module.exports = [
  {
    lens: {
      _t: 'tradle.Lens'
    },
    error: /model not found/
  },
  {
    lens: {
      model: 'tradle.PersonalInfo'
    },
    error: /tradle\.Lens/
  },
  {
    lens: {
      _t: 'tradle.Lens',
      model: 'tradle.PersonalInfo',
      id: 'lens.safere.PersonalInfo',
      hidden: [
        'foot'
      ],
      required: [
        // additional required properties
      ]
    },
    error: /foot/
  }
]
