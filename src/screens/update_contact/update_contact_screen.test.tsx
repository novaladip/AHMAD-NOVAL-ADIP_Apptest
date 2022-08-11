import React, {useEffect} from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, render, screen} from '@testing-library/react-native';

import {View} from 'react-native';
import {Provider} from 'react-redux';
import {act} from 'react-test-renderer';
import {mockContactsResponse, server} from '../../../mocks/handlers';
import {store} from '../../stores/store';
import {
  UpdateContactScreen,
  UpdateContactScreenNavigationProp,
} from './update_contact_screen';

const updateContactParam = mockContactsResponse.data[0];

function Home() {
  const navigation = useNavigation<UpdateContactScreenNavigationProp>();

  useEffect(() => {
    navigation.push('UpdateContact', {contact: updateContactParam});
  }, [navigation]);

  return <View />;
}

const Stack = createNativeStackNavigator();

describe('[UpdateContactScreen]', () => {
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
            name="UpdateContact"
            component={UpdateContactScreen}
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

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(
      screen.queryByTestId('update_contact_screen_' + updateContactParam.id),
    ).toBeTruthy();

    const updateContactTitle = screen.queryByText(
      `${updateContactParam.firstName} ${updateContactParam.lastName}`,
    );
    expect(updateContactTitle).toBeTruthy();

    // find AvatarPicker
    const avatarPicker = await screen.findByTestId('avatar_picker');
    // find AvatarImagePreview
    const avatarPickerPreview = await screen.findByTestId(
      'avatar_picker_preview',
    );
    // find FirstNameInput
    const firstNameInput = await screen.findByTestId('first_name_input');
    // find LastNameInput
    const lastNameInput = await screen.findByTestId('last_name_input');
    // find Age Input
    const ageInput = await screen.findByTestId('age_input');
    // submit button
    const submitButton = await screen.findByTestId('update_contact_button');

    expect(avatarPicker).toBeTruthy();
    expect(avatarPickerPreview).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(ageInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    // validate initial form values
    expect(firstNameInput.props.value).toBe(updateContactParam.firstName);
    expect(lastNameInput.props.value).toBe(updateContactParam.lastName);
    expect(ageInput.props.value).toBe(updateContactParam.age.toString());
    expect(avatarPickerPreview.props.source.uri).toBe(updateContactParam.photo);

    const expectedInput = {
      firstName: 'Jane',
      lastName: 'Doez',
      age: '50',
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
});
