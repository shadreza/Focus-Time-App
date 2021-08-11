import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContextForHomePageOrNot } from '../../App';

const TimerPage = () => {

    const HomePageContext = useContext(ContextForHomePageOrNot)

    const toggleBetweenHomeAndTimer = () => {
        HomePageContext[1](!HomePageContext[0])
    }

    return (
        <View>
        <Text>This is the timer page</Text>
        </View>
    );
};

export default TimerPage;

const styles = StyleSheet.create({
  
});