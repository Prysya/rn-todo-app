import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export const AppCard = ({ children, style }) => (
  <View style={{ ...styles.root, ...style }}>{children}</View>
);
