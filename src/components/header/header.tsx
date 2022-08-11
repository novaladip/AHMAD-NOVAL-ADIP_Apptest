import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {styles} from './header.style';

interface Props {
  title: string;
}

export function Header({title}: Props) {
  const {canGoBack, goBack} = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() && (
        <TouchableOpacity onPress={goBack}>
          <Icon name="chevron-thin-left" size={30} />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
