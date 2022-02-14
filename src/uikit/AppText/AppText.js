import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-regular',
  },
});

export const AppText = ({ children, style }) => (
  <Text style={{ ...styles.default, ...style }}>{children}</Text>
);
