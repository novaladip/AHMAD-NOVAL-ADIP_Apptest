import {rest} from 'msw';
import {setupServer} from 'msw/node';

export const mockContactsResponse = {
  message: 'Get contacts',
  data: [
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'https://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo:
        'https://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
  ],
};

export const handlers = [
  rest.get(
    'https://simple-contact-crud.herokuapp.com/contact',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockContactsResponse));
    },
  ),
  rest.post(
    'https://simple-contact-crud.herokuapp.com/contact',
    async (req, res, ctx) => {
      const data = await req.json();
      const expectedData = {
        age: 22,
        firstName: 'Jane',
        lastName: 'Doe',
        photo:
          'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png',
      };

      if (JSON.stringify(data) === JSON.stringify(expectedData)) {
        return res(ctx.status(200), ctx.json(mockContactsResponse));
      } else {
        return res(ctx.status(400), ctx.json({message: 'Bad request'}));
      }
    },
  ),
  rest.post(
    'https://api.cloudinary.com/v1_1/dwxrp75d0/image/upload',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({secure_url: 'https://image.jpg'}));
    },
  ),

  rest.put(
    'https://simple-contact-crud.herokuapp.com/contact/:id',
    async (req, res, ctx) => {
      const {data} = await req.json();
      const expectedData = {
        age: 22,
        firstName: 'Jane',
        lastName: 'Doe',
        photo:
          'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png',
      };

      if (JSON.stringify(data) === JSON.stringify(expectedData)) {
        return res(ctx.status(200), ctx.json({message: 'Contact updated'}));
      } else {
        return res(ctx.status(400), ctx.json({message: 'Bad request'}));
      }
    },
  ),
];

export const server = setupServer(...handlers);
