module.exports = [
  {
    _t: 'tradle.Lens',
    model: 'tradle.PersonalInfo',
    id: 'lens.safere.PersonalInfo',
    // 'properties' map just like in model
    // these can get merged into tradle.PhotoID when displaying the view/edit
    properties: {
      firstName: {
        title: 'Given name'
      },
      lastName: {
        title: 'Surname'
      },
      country: {
        defaultValue: 'NZ',
        // pin: [
        //   'NZ',
        //   'UK'
        // ]
      },
      nationality: {
        defaultValue: 'NZ',
        // pin: [
        //   'New Zealander',
        //   'English'
        // ]
      },
      education: {
        // oneOf: [
        //   'highschool',
        //   'college'
        // ]
      }
    },
    hidden: [
      'region'
    ],
    required: [
      // additional required properties
    ]
  }
]
