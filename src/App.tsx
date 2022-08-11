import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateContactScreen, HomeScreen, UpdateContactScreen} from './screens';
import {Provider} from 'react-redux';
import {store} from './stores/store';

const Stack = createNativeStackNavigator();

interface Props {
  initialRouteName?: string;
}

export default function App({initialRouteName}: Props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName || 'Home'}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
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
}
