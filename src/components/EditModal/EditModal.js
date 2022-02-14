import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, TextInput, View } from 'react-native';
import { THEME } from '../../constants/Theme/theme';
import { AppButton } from '../../uikit/AppButton/AppButton';

export const EditModal = ({ visible, handleModalClose, value, saveEditableTodo, id }) => {
  const [inputValue, setInputValue] = useState(value);
  
  const saveHandler = () => {
    if (inputValue.trim().length < 3) {
      Alert.alert(
        'Ошибка!',
        `Минимальная длинна названия 3 символа. Сейчас ${inputValue.trim().length} символов`,
      );
    } else {
      saveEditableTodo(id, inputValue);
      handleModalClose();
    }
  };
  
  const handleCancel = () => {
    setInputValue(value);
    handleModalClose();
  };
  
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.root}>
        <TextInput
          style={styles.input}
          placeholder={'Введите todo'}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          value={inputValue}
          onChangeText={setInputValue}
        />
        
        <View style={styles.buttons}>
          <AppButton color={THEME.DANGER_COLOR} onPress={handleCancel}>
            Отменить
          </AppButton>
          <AppButton onPress={saveHandler}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
