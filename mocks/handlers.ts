import {rest} from 'msw';

export const mockContactsResponse = {
  message: 'Get contacts',
  data: [
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo: 'N/A',
    },
  ],
};

export const contactsHandler = [
  rest.get(
    'https://simple-contact-crud.herokuapp.com/contact',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockContactsResponse));
    },
  ),
];
