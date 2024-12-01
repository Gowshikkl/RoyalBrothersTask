import React from 'react';
import { Modal, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';

const Loader = () => {
    const loader = useSelector(state => state.CommonReducer.loader);
    return (
        <Modal animationType="none" transparent={true} visible={loader}>
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    opacity: 0.4,
                }}>
                <ActivityIndicator size="large" color='#006400' />
            </View>
        </Modal>
    )
};
export default Loader;