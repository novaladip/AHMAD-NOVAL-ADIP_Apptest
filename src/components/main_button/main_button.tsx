import React, {useCallback} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './main_button.style';

interface Props {
  label: string;
  isLoading: boolean;
  onPress: () => void;
  testId?: string;
}

export function MainButton({testId, label, isLoading, onPress}: Props) {
  const handleOnPress = useCallback(() => {
    if (isLoading) {
      return;
    }

    onPress();
  }, [isLoading, onPress]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
      testID={testId}>
      <Text style={styles.text}>
        {label} {isLoading && '...'}
      </Text>
    </TouchableOpacity>
  );
}
