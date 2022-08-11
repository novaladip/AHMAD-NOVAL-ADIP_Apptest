import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import * as yup from 'yup';
import {
  AvatarPicker,
  Header,
  LoadingOverlahy,
  MainButton,
  MainTextInput,
} from '../../components';
import {Contact} from '../../models';
import {uploadImageService, useUpdateContactMutation} from '../../services';
import {styles} from './update_contact.styles';

export type UpdateContactScreenParam = {
  contact: {
    contact: Contact;
  };
};

export type UpdateContactScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'UpdateContactScreen'
>;

export function UpdateContactScreen() {
  const navigation = useNavigation();
  const {contact} =
    useRoute<RouteProp<UpdateContactScreenParam, 'contact'>>().params;
  const [updateContact, {isLoading, isError, isSuccess}] =
    useUpdateContactMutation();
  const [isUploading, setIsUploading] = React.useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = React.useState(false);
  const {values, errors, setFieldValue, handleSubmit} = useFormik<
    Omit<Contact, 'id'>
  >({
    initialValues: {
      age: contact.age,
      firstName: contact.firstName,
      lastName: contact.lastName,
      photo:
        contact.photo === 'N/A'
          ? 'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png'
          : contact.photo,
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
      let secureUrl = v.photo;
      if (isAvatarChanged) {
        try {
          setIsUploading(true);
          secureUrl = (await uploadImageService(v.photo)).secure_url;
          setIsUploading(false);
        } catch (e) {
          setIsUploading(false);
        }
      }
      const updatedContact = {
        id: contact.id,
        ...v,
        photo: secureUrl,
      };
      await updateContact(updatedContact);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess, navigation]);

  return (
    <View testID={`update_contact_screen_${contact.id}`}>
      <Header title={`${contact.firstName} ${contact.lastName}`} />
      <View style={styles.container}>
        <AvatarPicker
          currentAvartarUrl={values.photo}
          onAvatarPicked={v => {
            setFieldValue('photo', v);
            setIsAvatarChanged(true);
          }}
          error={errors.photo}
        />
        <MainTextInput
          label="First Name"
          value={values.firstName}
          onChangeText={v => setFieldValue('firstName', v)}
          error={errors.firstName}
        />
        <MainTextInput
          label="Last name"
          value={values.lastName}
          onChangeText={v => setFieldValue('lastName', v)}
          error={errors.lastName}
        />
        <MainTextInput
          label="Age"
          value={values.age.toString()}
          onChangeText={v => {
            if (v === '') {
              setFieldValue('age', 0);
            } else {
              setFieldValue('age', parseInt(v, 10));
            }
          }}
        />
        <MainButton
          label="Update"
          isLoading={isUploading || isLoading}
          onPress={handleSubmit}
        />
        {isError && <Text>Something wen't wrong, please try again</Text>}
      </View>
      <LoadingOverlahy show={isUploading || isLoading} />
    </View>
  );
}
