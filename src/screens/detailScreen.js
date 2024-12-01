import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import back from "../assets/back_icon.png"
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
    const { imageUrl, title, description } = route.params;
    const navigation = useNavigation()

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity  onPress={()=>{navigation.goBack()}} >
                <Image source={back} style={{width:20,height : 20 ,marginHorizontal: 20,marginVertical : 15}} />
            </TouchableOpacity>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
});

export default DetailScreen;
