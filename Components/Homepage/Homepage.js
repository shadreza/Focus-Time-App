import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView  } from 'react-native';
import { ContextForHomePageOrNot, logoUrl, removeImageUrl } from '../../App';

const Homepage = () => {

    const HomePageContext = useContext(ContextForHomePageOrNot)

    const toggleBetweenHomeAndTimer = () => {
        HomePageContext[1]( ! HomePageContext[0] )
    }

    const focusTasks = [1,2,3,4,1,2,3,4]

    return (
        <View style={styles.homeMainContainer}>
            <Image 
                source={{
                    uri : logoUrl
                }} 
                style={styles.logo}
            />
            <View style={styles.heroTextSection}>
                <Text style={styles.header}>FocusTime</Text>
                <Text style={styles.sideLine}>The App lets you focus on your tasks</Text>
            </View>
            {
                focusTasks.length >0 && 
                    <View style={styles.allFocusTasksSection}>
                        <Text style={styles.allFocusSectionText}>Tasks that demand your focus</Text>
                        <ScrollView style={styles.allFocusScroll}>
                            {
                                focusTasks.map(task =>
                                    <TouchableOpacity>
                                        <View style={styles.singleTask}>
                                            <Text style={styles.singleTaskName}>{task}</Text>
                                            <TouchableOpacity>
                                                <Image 
                                                    source={{
                                                        uri : removeImageUrl
                                                    }} 
                                                    style={styles.removeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
            }
            
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
  homeMainContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  heroTextSection: {
    alignItems: 'center',
  },
  header: {
    color: '#A73489',
    fontSize: 26,
    marginTop: 10,
  },
  sideLine: {
    color: '#512D6D',
    fontSize: 16,
    marginTop: 6,
  },
  allFocusTasksSection: {
    marginTop: 70,
    alignItems: 'center',
  },
  singleTask: {
    backgroundColor: 'mintcream',
    minWidth: '80%',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    padding: 6,
    display: 'flex',
    flexDirection: 'row'
  },
  singleTaskName: {
    color: 'tomato',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  allFocusSectionText: {
    color: '#035397',
    fontSize: 20,
  },
  allFocusScroll: {
    maxHeight: '60%',
    marginTop: 10,
  },
  removeImage: {
    width: 15,
    height: 15,
  },
});