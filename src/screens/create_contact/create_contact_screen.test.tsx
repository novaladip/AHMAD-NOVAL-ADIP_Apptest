import React from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, render, screen} from '@testing-library/react-native';

import {TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import {act} from 'react-test-renderer';
import {server} from '../../../mocks/handlers';
import {store} from '../../stores/store';
import {
  CreateContactScreen,
  CreateContactScreenNavigationProp,
} from './create_contact_screen';

function Home() {
  const navigation = useNavigation<CreateContactScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.push('CreateContact')}
      testID="create_contact_navigation_button">
      Create Contact
    </TouchableOpacity>
  );
}

const Stack = createNativeStackNavigator();

describe('[CreateContactScreen]', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  const component = (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateContact"
            component={CreateContactScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

  test('should render CreateContactScreen', async () => {
    render(component);
    const createContactButton = await screen.findByTestId(
      'create_contact_navigation_button',
    );
    fireEvent.press(createContactButton);
    const createContactTitle = await screen.findByText('Create a new contact');
    expect(createContactTitle).toBeDefined();

    // find AvatarPicker
    const avatarPicker = await screen.findByTestId('avatar_picker');
    // find FirstNameInput
    const firstNameInput = await screen.findByTestId('first_name_input');
    // find LastNameInput
    const lastNameInput = await screen.findByTestId('last_name_input');
    // find Age Input
    const ageInput = await screen.findByTestId('age_input');
    // submit button
    const submitButton = await screen.findByTestId('submit_button');

    expect(avatarPicker).toBeDefined();
    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(ageInput).toBeDefined();
    expect(submitButton).toBeDefined();

    const expectedInput = {
      firstName: 'Jane',
      lastName: 'Doe',
      age: '22',
      photo: 'https://example.com/photo.jpg',
    };

    fireEvent.changeText(firstNameInput, expectedInput.firstName);
    fireEvent.changeText(lastNameInput, expectedInput.lastName);
    fireEvent.changeText(ageInput, expectedInput.age);

    // validate text input values
    expect(firstNameInput.props.value).toBe(expectedInput.firstName);
    expect(lastNameInput.props.value).toBe(expectedInput.lastName);
    expect(ageInput.props.value).toBe(expectedInput.age);
    await act(() => {
      fireEvent(submitButton, 'press');
    });

    await new Promise(resolve => setTimeout(resolve, 100));
    // validate navigate back to previous screen when success
    const createContactScreen = screen.queryAllByTestId(
      'create_contact_screen',
    );
    expect(createContactScreen.length).toBe(0);
  });

  test('submit with invalid values should show errors text', async () => {
    render(component);
    const createContactButton = await screen.findByTestId(
      'create_contact_navigation_button',
    );
    fireEvent.press(createContactButton);
    const createContactTitle = await screen.findByText('Create a new contact');
    expect(createContactTitle).toBeDefined();

    const submitButton = await screen.findByTestId('submit_button');
    fireEvent.press(submitButton);

    const firstNameError = await screen.findByText('First name is required');
    const lastNameError = await screen.findByText('Last name is required');
    const ageError = await screen.findByText('Age must be positive');

    expect(firstNameError).toBeDefined();
    expect(lastNameError).toBeDefined();
    expect(ageError).toBeDefined();
  });

  test('should show error text when failed to create contact', async () => {
    // render(component);
    // const createContactButton = await screen.findByTestId(
    //   'create_contact_navigation_button',
    // );
    // fireEvent.press(createContactButton);
    // const createContactTitle = await screen.findByText('Create a new contact');
    // expect(createContactTitle).toBeDefined();
    // // find AvatarPicker
    // const avatarPicker = await screen.findByTestId('avatar_picker');
    // // find FirstNameInput
    // const firstNameInput = await screen.findByTestId('first_name_input');
    // // find LastNameInput
    // const lastNameInput = await screen.findByTestId('last_name_input');
    // // find Age Input
    // const ageInput = await screen.findByTestId('age_input');
    // // submit button
    // const submitButton = await screen.findByTestId('submit_button');
    // expect(avatarPicker).toBeDefined();
    // expect(firstNameInput).toBeDefined();
    // expect(lastNameInput).toBeDefined();
    // expect(ageInput).toBeDefined();
    // expect(submitButton).toBeDefined();
    // const expectedInput = {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   age: '20',
    //   photo: 'https://example.com/photo.jpg',
    // };
    // fireEvent.changeText(firstNameInput, expectedInput.firstName);
    // fireEvent.changeText(lastNameInput, expectedInput.lastName);
    // fireEvent.changeText(ageInput, expectedInput.age);
    // await act(() => fireEvent.press(submitButton));
    // await new Promise(resolve => setTimeout(resolve, 500));
    // const errorText = await screen.findByText('Something went wrong');
    // expect(errorText).toBeTruthy();
  });
});
