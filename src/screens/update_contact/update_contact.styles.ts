import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 50 : 5,
  },
  headerText: {
    fontSize: 20,

    marginBottom: 20,
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
