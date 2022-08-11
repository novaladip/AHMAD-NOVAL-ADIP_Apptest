import React, {useEffect} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import * as yup from 'yup';

import {
  AvatarPicker,
  Header,
  MainButton,
  MainTextInput,
} from '../../components';
import {styles} from './create_contact.styles';
import {useFormik} from 'formik';
import {Contact} from '../../models';
import {uploadImageService, useCreateContactMutation} from '../../services';

export type CreateContactScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'CreateContactScreen'
>;

export function CreateContactScreen() {
  const navigation = useNavigation();
  const [isUploading, setIsUploading] = React.useState(false);
  const [createContact, {isLoading, isError, isSuccess}] =
    useCreateContactMutation();
  const {values, errors, setFieldValue, handleSubmit} = useFormik<
    Omit<Contact, 'id'>
  >({
    initialValues: {
      age: 0,
      firstName: '',
      lastName: '',
      photo:
        'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png',
    },
    validationSchema: yup.object().shape({
      photo: yup.string().required('Photo is required'),
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      age: yup
        .number()
        .required('Age is required')
        .positive('Age must be positive')
        .integer('Age must be an integer'),
    }),
    onSubmit: async v => {
      try {
        setIsUploading(true);
        const {secure_url} = await uploadImageService(v.photo);
        setIsUploading(false);
        await createContact({
          ...v,
          photo: secure_url,
        });
      } catch (e) {
        setIsUploading(false);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess, navigation]);

  return (
    <View testID="create_contact_screen">
      <Header title="Create a new contact" />
      <View style={styles.container}>
        <AvatarPicker
          currentAvartarUrl={values.photo}
          onAvatarPicked={v => setFieldValue('photo', v)}
          error={errors.photo}
        />
        <MainTextInput
          label="First Name"
          value={values.firstName}
          error={errors.firstName}
          onChangeText={v => setFieldValue('firstName', v)}
        />
        <MainTextInput
          label="Last name"
          value={values.lastName}
          onChangeText={v => setFieldValue('lastName', v)}
          error={errors.lastName}
        />
        <MainTextInput
          label="Age"
          value={`${values.age}`}
          error={errors.age}
          onChangeText={v => {
            if (v === '') {
              setFieldValue('age', 0);
            } else {
              setFieldValue('age', parseInt(v, 10));
            }
          }}
        />
        <MainButton
          label="Submit"
          isLoading={isUploading || isLoading}
          onPress={handleSubmit}
        />
        {isError && <Text>{'Something went wrong'}</Text>}
      </View>
    </View>
  );
}
