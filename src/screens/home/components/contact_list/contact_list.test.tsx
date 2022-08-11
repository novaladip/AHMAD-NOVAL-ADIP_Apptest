import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../../../stores/store';
import {mockContactsResponse} from '../../../../../mocks/handlers';
import {ContactList} from './contact_list';

test('renders correctly when successfully fetching contacts', async () => {
  render(
    <Provider store={store}>
      <ContactList />
    </Provider>,
  );

  for (let i = 0; i < mockContactsResponse.data.length; i++) {
    const contact = mockContactsResponse.data[i];
    expect(
      await screen.findByText(contact.firstName + ' ' + contact.lastName),
    ).toBeTruthy();
  }
});
