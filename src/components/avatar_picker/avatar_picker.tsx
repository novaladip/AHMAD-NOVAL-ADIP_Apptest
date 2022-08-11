import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    borderBottomWidth: 2,
    borderBottomColor: '#00',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

interface Props {
  currentAvartarUrl?: string;
  onAvatarPicked: (avatarUrl: string | undefined) => void;
  error?: string;
  testId?: string;
}

export function AvatarPicker({
  testId,
  currentAvartarUrl,
  onAvatarPicked,
  error,
}: Props) {
  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.assets && result.assets.length > 0) {
      onAvatarPicked(result.assets![0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={testId}
        style={styles.avatarContainer}
        onPress={handleSelectImage}>
        {currentAvartarUrl ? (
          <Image
            testID="avatar_picker_preview"
            source={{uri: currentAvartarUrl}}
            style={styles.avatarContainer}
          />
        ) : null}
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
