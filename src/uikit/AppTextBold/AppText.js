import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-bold',
  },
});

export const AppTextBold = ({ children, style, ...props }) => (
  <Text style={{ ...styles.default, ...style }} {...props}>{children}</Text>
);
