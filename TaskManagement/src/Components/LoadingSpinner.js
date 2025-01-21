import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

const LoadingSpinner = ({visible, message = 'Loading...'}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#4caf50" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});
export default LoadingSpinner;
