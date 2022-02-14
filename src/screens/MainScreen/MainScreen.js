import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import { AppLoader } from '../../components/AppLoader/AppLoader';
import { Todo } from '../../components/Todo/Todo';
import { THEME } from '../../constants/Theme/theme';
import { ScreenContext } from '../../context/screen/screenContext';
import { TodoContext } from '../../context/todo/todoContext';
import { AppButton } from '../../uikit/AppButton/AppButton';
import { AppText } from '../../uikit/AppText/AppText';
import { AppTextBold } from '../../uikit/AppTextBold/AppText';

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );
  
  const loadTodos = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);
  
  useEffect(() => {
    loadTodos();
  }, []);
  
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    
    Dimensions.addEventListener('change', update);
    
    return () => Dimensions.removeEventListener('change', update);
  }, []);
  
  if (loading) {
    return <AppLoader />;
  }
  
  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    );
  }
  
  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Todo
            title={item.title}
            onPress={() => changeScreen(item.id)}
            longPressHandler={() => removeTodo(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image style={styles.img} source={require('../../../assets/empty.png')} />
        <AppTextBold style={styles.text}>Список дел пуст!</AppTextBold>
      </View>
    );
  }
  
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 450,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    color: THEME.MAIN_COLOR,
    opacity: 0.7,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 10,
  },
});
