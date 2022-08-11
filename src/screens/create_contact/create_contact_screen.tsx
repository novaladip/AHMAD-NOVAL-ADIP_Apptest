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

const defaultAvatar =
  'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png';

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
      photo: defaultAvatar,
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
        let photo = v.photo;
        setIsUploading(true);
        if (photo !== defaultAvatar) {
          const {secure_url} = await uploadImageService(v.photo);
          photo = secure_url;
          setIsUploading(false);
        }
        await createContact({
          ...v,
          photo,
        });
      } catch (e) {
        console.log('errrrrroo');
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
          testId="avatar_picker"
          currentAvartarUrl={values.photo}
          onAvatarPicked={v => setFieldValue('photo', v)}
          error={errors.photo}
        />
        <MainTextInput
          testId="first_name_input"
          label="First Name"
          value={values.firstName}
          error={errors.firstName}
          onChangeText={v => setFieldValue('firstName', v)}
        />
        <MainTextInput
          testId="last_name_input"
          label="Last name"
          value={values.lastName}
          onChangeText={v => setFieldValue('lastName', v)}
          error={errors.lastName}
        />
        <MainTextInput
          testId="age_input"
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
          testId="submit_button"
          label="Submit"
          isLoading={isUploading || isLoading}
          onPress={handleSubmit}
        />
        {isError && <Text>{'Something went wrong'}</Text>}
      </View>
    </View>
  );
}
