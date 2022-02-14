import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { AddTodo } from '../../components/AddTodo/AddTodo';
import { Todo } from '../../components/Todo/Todo';
import { THEME } from '../../constants/Theme/theme';
import { ScreenContext } from '../../context/screen/screenContext';
import { TodoContext } from '../../context/todo/todoContext';
import { AppTextBold } from '../../uikit/AppTextBold/AppText';

export const MainScreen = () => {
  const { addTodo, todos, removeTodo } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );
  
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    
    Dimensions.addEventListener('change', update);
    
    return () => Dimensions.removeEventListener('change', update);
  }, []);
  
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
});
