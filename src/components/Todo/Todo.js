import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../../uikit/AppText/AppText';

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export const Todo = ({ title, longPressHandler, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} onLongPress={longPressHandler}>
      <View style={styles.todo}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
};
