import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

export type UpdateContactScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'UpdateContactScreen'
>;

export function UpdateContactScreen() {
  return (
    <View>
      <Text>Update Contact</Text>
    </View>
  );
}
