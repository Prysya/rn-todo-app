import React, { useContext, useReducer } from 'react';
import { Alert } from 'react-native';
import { messages } from '../../constants/messages';
import { DB_URL, getDbUrlWithId } from '../../constants/url';
import { Http } from '../../utils/http/http';
import { ScreenContext } from '../screen/screenContext';
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export function TodoState({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  const { changeScreen } = useContext(ScreenContext);
  
  const addTodo = async (title) => {
    clearError();
    
    try {
      const data = await Http.post(DB_URL, ({ title }));
      
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (error) {
      showError(messages.errorMessage);
    }
  };
  
  const fetchTodos = async () => {
    showLoader();
    clearError();
    
    try {
      const data = await Http.get(DB_URL);
      
      if (!data) {
        throw new Error(messages.dataIsUndefined);
      }
      
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError(messages.dataIsUndefined);
    } finally {
      hideLoader();
    }
  };
  
  const removeTodo = (id) => {
    const todo = state.todos.find((item) => item.id === id);
    
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null);
            await Http.delete(getDbUrlWithId(id));
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false },
    );
  };
  
  const updateTodo = async (id, title) => {
    clearError();
    
    try {
      await Http.patch(getDbUrlWithId(id), { title });
      
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError(messages.dataIsUndefined);
    }
  };
  
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
