import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainButton} from '../main_button/main_button';
import {styles} from './common_error.styles';

interface Props {
  error?: string;
  retry?: () => void;
}

export function CommonError({error, retry}: Props) {
  return (
    <View style={styles.container}>
      <Icon name="error-outline" size={100} />
      <View style={styles.spacer} />
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.spacer} />
      {retry && <MainButton label="Retry" onPress={retry} isLoading={false} />}
    </View>
  );
}
