import React from 'react';
import {StyleSheet, View} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export function ContactListLoading() {
  return (
    <View style={styles.container}>
      <ContentLoader backgroundColor="#6f706f">
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="15" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="35" rx="3" ry="3" width="250" height="10" />
        <Circle cx="30" cy="110" r="30" />
        <Rect x="80" y="100" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="120" rx="3" ry="3" width="250" height="10" />
        <Circle cx="30" cy="190" r="30" />
        <Rect x="80" y="180" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="200" rx="3" ry="3" width="250" height="10" />
        <Circle cx="30" cy="270" r="30" />
        <Rect x="80" y="260" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="280" rx="3" ry="3" width="250" height="10" />
        <Circle cx="30" cy="360" r="30" />
        <Rect x="80" y="350" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="370" rx="3" ry="3" width="250" height="10" />
        <Circle cx="30" cy="450" r="30" />
        <Rect x="80" y="440" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="460" rx="3" ry="3" width="250" height="10" />
        <Circle cx="30" cy="540" r="30" />
        <Rect x="80" y="530" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="550" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    </View>
  );
}
