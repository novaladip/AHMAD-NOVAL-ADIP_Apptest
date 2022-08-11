import React from 'react';

import {TouchableOpacity, Text, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {styles} from './contact_item.styles';
import {Contact} from '../../../../models';
import {useDeleteContactByIdMutation} from '../../../../services';
import {useNavigation} from '@react-navigation/native';
import {UpdateContactScreenNavigationProp} from '../../../update_contact/update_contact_screen';

export const ContactItem = ({contact}: {contact: Contact}) => {
  const navigation = useNavigation<UpdateContactScreenNavigationProp>();
  const [deleteContactById, {isLoading}] = useDeleteContactByIdMutation();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      key={contact.id}
      testID={'contact-list-item'}
      style={styles.container}>
      <View style={styles.row}>
        <View style={styles.leftItem}>
          {contact.photo === 'N/A' ? (
            <View style={styles.initialAvatar}>
              <Text style={styles.initialAvatarText}>
                {contact.firstName.charAt(0)} {contact.lastName.charAt(0)}
              </Text>
            </View>
          ) : (
            <Image
              source={{
                uri: contact.photo,
                width: 50,
              }}
              style={styles.photo}
            />
          )}

          <View>
            <Text style={styles.fullName}>
              {contact.firstName} {contact.lastName}
            </Text>
            <Text style={styles.age}>{contact.age} years old</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.push('UpdateContact', {
              contact,
            })
          }>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity>
          <Icon
            name="delete"
            size={30}
            onPress={() => deleteContactById(contact.id)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
