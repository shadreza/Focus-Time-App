import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ContextForHomePageOrNot, ContextForCurrentTask } from '../../App';

const TimerPage = () => {

    const HomePageContext = useContext(ContextForHomePageOrNot)
    const CurrentTaskContext = useContext(ContextForCurrentTask)

    const task = CurrentTaskContext[0]

    const toggleBetweenHomeAndTimer = () => {
        HomePageContext[1](!HomePageContext[0])
    }

    return (
        <View style={styles.timerMainContainer}>
            <Text>This is the timer page</Text>
            <Text>{task.name}</Text>
            <TouchableOpacity onPress={toggleBetweenHomeAndTimer}>
                <Text>Toggle</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TimerPage;

const styles = StyleSheet.create({
    timerMainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});