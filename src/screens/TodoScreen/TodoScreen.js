import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { EditModal } from '../../components/EditModal/EditModal';
import { THEME } from '../../constants/Theme/theme';
import { ScreenContext } from '../../context/screen/screenContext';
import { TodoContext } from '../../context/todo/todoContext';
import { AppButton } from '../../uikit/AppButton/AppButton';
import { AppCard } from '../../uikit/AppCard/AppCard';
import { AppTextBold } from '../../uikit/AppTextBold/AppText';

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  
  const [modal, setModal] = useState(false);
  
  const selectedTodo = todos.find((todo) => todo.id === todoId);
  
  const saveHandler = async (id, title) => {
    await updateTodo(id, title);
    setModal(false);
  };
  
  return (
    <View>
      <EditModal
        value={selectedTodo.title}
        id={selectedTodo.id}
        visible={modal}
        handleModalClose={() => setModal(false)}
        saveEditableTodo={saveHandler}
      />
      
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {selectedTodo.title}
        </AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <AppButton color={THEME.GRAY} onPress={() => changeScreen(null)}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(selectedTodo.id)}>
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  button: {
    width: Dimensions.get('window').width > 400 ? 150 : 100,
  },
  title: {
    fontSize: 20,
    maxWidth: '75%',
  },
});
