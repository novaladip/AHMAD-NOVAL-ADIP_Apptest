import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ContactList} from './components';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'Home'
>;

export function HomeScreen() {
  return (
    <SafeAreaView>
      <ContactList />
    </SafeAreaView>
  );
}
