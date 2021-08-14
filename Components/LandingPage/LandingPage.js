import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { logoUrl } from '../Default Values/DefaultValues'

const LandingPage = () => {

    return (
        <View style={styles.landingPageContainer}>
            <Image 
                source={{
                    uri : logoUrl
                }} 
                style={styles.logo}
            />
            <Text style={styles.header}>Welcome to FocusTime !</Text>
            <Text style={styles.tagLine}>learn to stay focused</Text>
        </View>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
  landingPageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 70,
    height: 70,
    position: 'relative',
    bottom: 60,
  },
  header: {
      color: 'white',
      fontSize: 30,
      position: 'relative',
      bottom: 20,
  },
  tagLine: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  }
});