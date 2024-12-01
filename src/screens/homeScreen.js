import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCoffeeList } from '../redux/action/homeScreenAction';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const coffeeList = useSelector(state => state.HomeReducer.coffeeList)
    const [flatListData, setFaltlistData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        getCoffeeList(dispatch)
    }, [])

    useEffect(() => {
        if(coffeeList.length > 0){
            setLoading(false)
            setFaltlistData(coffeeList)
        }

    }, [coffeeList])


    useEffect(()=>{
        console.log("lads",loading)
    },[loading])

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            setFaltlistData((prev) =>
                prev.filter((item) =>
                    item.title.toLowerCase().includes(text.toLowerCase())
                )
            );
        } else {
            setFaltlistData(coffeeList);
        }
    };

    const renderItem = useCallback(({ item }) => {
        return (
            <CoffeItem item={item} />
        );
    }, []);

    const RenderShimmerItem = () => {
        console.log("ente")
        return (
            <View style={styles.itemContainer}>
                <ShimmerPlaceholder
                    style={styles.image}
                    shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']} // Gradient colors for shimmer
                    shimmerWidth={200}
                    duration={1000} // Speed of shimmer animation
                />
                <View style={styles.textContainer}>
                    <ShimmerPlaceholder
                        style={styles.shimmerTitle}
                        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
                        shimmerWidth={200}
                        duration={1000}
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerDescription}
                        shimmerColors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
                        shimmerWidth={200}
                        duration={1000}
                    />
                </View>
            </View>
        )
    }
    const CoffeItem = React.memo(({ item }) => {
        return (
            <TouchableOpacity style={styles.tile} onPress={() => {
                navigation.navigate('DetailScreen', {
                    imageUrl: item.image,
                    title: item.title,
                    description: item.description,
                });
            }} >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, flexDirection: "column" ,marginLeft :10}} >
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </TouchableOpacity>

        )
    })


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Logout",
                            "Are you sure you want to logout?",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel",
                                },
                                {
                                    text: "Logout",
                                    onPress: async () => {
                                        try {
                                            await AsyncStorage.removeItem('isLoggedIn');
                                            navigation.dispatch(
                                                CommonActions.reset({
                                                    index: 0,
                                                    routes: [{ name: 'Login' }],
                                                })
                                            );
                                        } catch (error) {
                                            console.error("Error logging out:", error);
                                        }
                                    },
                                },
                            ]
                        );

                    }}>
                        <Text style={{ color: "red" }}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={loading ? Array.from({ length: 10 }) : flatListData}
                    keyExtractor={(item, index) => (item?.id ?? index.toString())}
                    renderItem={loading ? RenderShimmerItem : renderItem}
                />

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#f7f7f7',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        justifyContent: 'space-between',
    },
    searchInput: {
        width: '85%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 16,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    tile: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        padding: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode : "cover",
        borderRadius: 8,
        marginRight: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    imagePlaceholder: {
        borderRadius: 8,
        marginRight: 16,
    },
    titlePlaceholder: {
        marginBottom: 10,
        borderRadius: 4,
    },
    descriptionPlaceholder: {
        borderRadius: 4,
    },

    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    shimmerTitle: {
        width: '60%',
        height: 20,
        borderRadius: 4,
        marginBottom: 8,
    },
    shimmerDescription: {
        width: '80%',
        height: 16,
        borderRadius: 4,
    },
});

export default HomeScreen;
