import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Homepage = () => {
  return (
    <View style={styles.homeMainContainer}>
      <Text style={styles.header}>This is the homing page</Text>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  homeMainContainer: {
    alignItems: 'center',
  },
  header: {
      color: 'white'
  }
});