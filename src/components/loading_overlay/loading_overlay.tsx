import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './loading_overlay.styles';

interface Props {
  show: boolean;
}

export function LoadingOverlahy({show}: Props) {
  if (!show) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
