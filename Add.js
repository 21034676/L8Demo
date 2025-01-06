import React, { useState, useEffect } from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import

const Add = ({ navigation, route }) => {
    const [letter, setLetter] = useState('');
    const [type, setType] = useState('Vowels');
    const [mydata, setMydata] = useState([]); // Initialize state for mydata

    // Use effect to parse the stringified data passed from Home screen
    useEffect(() => {
        if (route.params?.data) {
            const jsondata = JSON.parse(route.params.data); // Parse the string back into JSON
            setMydata(jsondata); // Set the data to mydata state
        }
    }, [route.params?.data]);

    // Custom function to save data to AsyncStorage
    const setData = async () => {
        try {
            // Save the updated mydata back to AsyncStorage as a string
            await AsyncStorage.setItem('alphadata', JSON.stringify(mydata));
        } catch (error) {
            console.error('Error saving data:', error); // Log any errors
        }

        // Navigate back to Home screen
        navigation.navigate('Home');
    };

    // Handle the submit button click
    const handleSubmit = () => {
        let item = { key: letter }; // Create a new item
        let indexnum = type === 'Vowels' ? 0 : 1; // Choose section based on type

        // Create a copy of mydata and add the new item
        const updatedData = [...mydata]; // Create a shallow copy of mydata
        updatedData[indexnum].data.push(item); // Add the new item to the correct section

        setMydata(updatedData); // Update the state with the modified data

        // Call setData function to save the updated data to AsyncStorage
        setData();
    };

    return (
        <View>
            <StatusBar />
            <Text>Letter:</Text>
            <TextInput
                maxLength={1}
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setLetter(text)} // Handle letter input
            />
            <RNPickerSelect
                defaultValue={type}
                onValueChange={(value) => setType(value)} // Handle type selection
                items={[
                    { label: 'Vowels', value: 'Vowels' },
                    { label: 'Consonants', value: 'Consonants' },
                ]}
            />
            <Button title="Submit" onPress={handleSubmit} /> {/* Submit button */}
        </View>
    );
};

export default Add;



