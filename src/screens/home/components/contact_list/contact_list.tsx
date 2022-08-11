import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {CommonError} from '../../../../components';
import {useFetchContactsQuery} from '../../../../services';
import {CreateContactScreenNavigationProp} from '../../../create_contact/create_contact_screen';
import {ContactItem} from '../contact_item/contact_item';
import {styles} from './contact_list.styles';
import {ContactListLoading} from './contact_list_loading';

export const ContactList = () => {
  const navigation = useNavigation<CreateContactScreenNavigationProp>();
  const {data, isError, isLoading, refetch} = useFetchContactsQuery(null);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Your Contact ({data?.length || 0} )</Text>
        <TouchableOpacity onPress={() => navigation.push('CreateContact')}>
          <Icon name="plussquareo" size={30} />
        </TouchableOpacity>
      </View>

      {isError && <CommonError error="Something went wrong" retry={refetch} />}
      {isLoading && <ContactListLoading />}
      {data && (
        <FlatList
          data={data}
          renderItem={({item}) => <ContactItem contact={item} />}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};
