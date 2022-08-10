import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {CreateContactScreenNavigationProp} from '../create_contact/create_contact_screen';
import {UpdateContactScreenNavigationProp} from '../update_contact/update_contact_screen';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'Home'
>;

export function HomeScreen() {
  const navigation = useNavigation<
    CreateContactScreenNavigationProp | UpdateContactScreenNavigationProp
  >();

  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Create Contact"
        onPress={() => navigation.push('CreateContact')}
      />
      <Button
        title="Edit Contact"
        onPress={() => navigation.push('UpdateContact')}
      />
    </View>
  );
}
