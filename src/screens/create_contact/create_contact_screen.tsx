import React from 'react';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

export type CreateContactScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'CreateContactScreen'
>;

export function CreateContactScreen() {
  return (
    <View>
      <Text>Create Contact</Text>
    </View>
  );
}
