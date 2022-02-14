import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { THEME } from '../../constants/Theme/theme';
import { ScreenContext } from '../../context/screen/screenContext';
import { MainScreen } from '../../screens/MainScreen/MainScreen';
import { TodoScreen } from '../../screens/TodoScreen/TodoScreen';
import { Navbar } from '../Navbar/Navbar';

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);
  
  return (
    <View style={styles.wrapper}>
      <Navbar title="Todo App!" />
  
      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});
