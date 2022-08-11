import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6f0',
  },
  initialAvatar: {
    height: 50,
    width: 50,
    backgroundColor: '#3a3a3a',
    marginRight: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialAvatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  fullName: {
    fontWeight: 'bold',
    color: '#32264d',
  },
  spacer: {
    width: 10,
  },
  age: {
    marginTop: 2,
    fontSize: 12,
    color: '#9e9e9e',
  },
});
