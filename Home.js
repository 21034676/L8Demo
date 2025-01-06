import React, { useState, useEffect } from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'impact',
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMydata] = useState([]); // State initialized as an empty array

    // Custom function to load data from AsyncStorage
    const getData = async () => {
        try {
            const datastr = await AsyncStorage.getItem('alphadata'); // Retrieve data from AsyncStorage
            if (datastr !== null) {
                const jsondata = JSON.parse(datastr); // Parse the JSON string
                setMydata(jsondata); // Set the parsed data to the state
            } else {
                // Default fallback data if AsyncStorage is empty
                setMydata([
                    {
                        title: 'Default Section',
                        bgcolor: '#f4f4f4',
                        data: [
                            { key: 'A' },
                            { key: 'B' },
                            { key: 'C' },
                        ],
                    },
                ]);
            }
        } catch (error) {
            console.error("Error fetching data:", error); // Log any errors
        }
    };

    // Call getData when the component is mounted
    useEffect(() => {
        getData();
    }, []);

    // Function to render each item in the SectionList
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate("Edit", {
                        index: index,
                        type: section.title,
                        key: item.key,
                    });
                }}
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    // Render the component
    return (
        <View>
            <StatusBar />
            <Button
                title="Add Letter"
                onPress={() => {
                    const mydataString = JSON.stringify(mydata); // Convert JSON array to a string
                    navigation.navigate("Add", { data: mydataString }); // Pass the stringified data to the Add screen
                }}
            />
            <SectionList
                sections={mydata} // Use mydata instead of datasource
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
                keyExtractor={(item, index) => item.key + index}
            />
        </View>
    );
};

export default Home;
