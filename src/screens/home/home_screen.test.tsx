import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import App from '../../App';
import {
  mockContactsResponse,
  serverFetchContactsFailure,
  serverFetchContactsSuccess,
} from '../../../mocks/handlers';

describe('[HomeScreen]', () => {
  const component = <App initialRouteName="Home" />;
  test('renders correctly when fetchContacts is success', async () => {
    beforeAll(() => {
      serverFetchContactsSuccess.listen();
    });

    afterEach(() => {
      serverFetchContactsSuccess.resetHandlers();
    });

    afterAll(() => {
      serverFetchContactsSuccess.close();
    });

    render(component);

    expect(screen.findByTestId('contact_list_loading')).toBeDefined();

    // find title i.e Your Contact (5)
    await new Promise(r => setTimeout(r, 100)); // wait until fetchContacts is done
    const title = await screen.findByText(
      `Your Contact (${mockContactsResponse.data.length})`,
    );
    expect(title).toBeDefined();

    const createContactButton = await screen.findByTestId(
      'create_contact_button_navigation',
    );
    expect(createContactButton).toBeDefined();

    // validate ContactItem is rendered
    const contactItems = await screen.findAllByTestId('contact-list-item');
    expect(contactItems.length).toBe(mockContactsResponse.data.length);

    // validate ContactItem rendering correct data
    for (let i = 0; i < mockContactsResponse.data.length; i++) {
      const contact = mockContactsResponse.data[i];
      // check full name
      expect(
        await screen.findByText(contact.firstName + ' ' + contact.lastName),
      ).toBeTruthy();
      // check age
      expect(await screen.findByText(`${contact.age} years old`)).toBeTruthy();
    }

    // navigate to UpdateContactScreen
    const contactToUpdate = mockContactsResponse.data[0];
    const updateContactButton = await screen.findByTestId(
      `contact_list_item_update_button_${contactToUpdate.id}`,
    );
    fireEvent.press(updateContactButton);
    expect(
      await screen.findByTestId(`update_contact_screen_${contactToUpdate.id}`),
    ).toBeDefined();
  });

  test('should able to navigate CreateContactScreen', async () => {
    beforeAll(() => {
      serverFetchContactsSuccess.listen();
    });

    afterEach(() => {
      serverFetchContactsSuccess.resetHandlers();
    });

    afterAll(() => {
      serverFetchContactsSuccess.close();
    });

    render(component);
    const createContactButton = await screen.findByTestId(
      'create_contact_button_navigation',
    );
    expect(createContactButton).toBeDefined();

    // navigate to CreateContactScreen
    fireEvent.press(createContactButton);
    const createContactTitle = await screen.findByText('Create a new contact');
    expect(createContactTitle).toBeDefined();
  });

  test('should render ContactListLoading while fetching fetchContacts', async () => {
    beforeAll(() => {
      serverFetchContactsSuccess.listen();
    });

    afterEach(() => {
      serverFetchContactsSuccess.resetHandlers();
    });

    afterAll(() => {
      serverFetchContactsSuccess.close();
    });

    render(component);
    expect(screen.findByTestId('contact_list_loading')).toBeDefined();
  });

  test('should render CommonError when failed to fetchContacts', async () => {
    beforeAll(() => {
      serverFetchContactsFailure.listen();
    });

    afterEach(() => {
      serverFetchContactsFailure.resetHandlers();
    });

    afterAll(() => {
      serverFetchContactsFailure.close();
    });

    render(component);
    await new Promise(r => setTimeout(r, 100)); // wait until fetchContacts is done
    expect(screen.findByTestId('common_error')).toBeDefined();
  });
});
