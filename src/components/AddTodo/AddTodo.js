import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from '../../constants/Theme/theme';

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss();
    } else {
      Alert.alert('todo не может быть пустым');
    }
  };
  
  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        placeholder="Введите todo"
        value={value}
        onChangeText={setValue}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <AntDesign.Button name="pluscircleo" onPress={pressHandler}>
        Добавить
      </AntDesign.Button>
    </View>
  );
};
