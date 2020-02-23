import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const IconButtonAdd = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          size={25}
          color={Platform.OS === 'android' ? 'white' : Colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export const IconButtonSave = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
          size={25}
          color={Platform.OS === 'android' ? 'white' : Colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13
  }
});
