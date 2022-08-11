import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#32264d',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  error?: string;
  testId?: string;
}

export function MainTextInput(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        testID={props.testId}
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
}
