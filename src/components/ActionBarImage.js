import React from 'react';

import {View, Image} from 'react-native';

const ActionBarImage = () => {

    return (
        <View style={{flexDirection: 'row'}}>
            <Image
                source={require('../../assets/splash.png')}
                style={{
                    width: 150,
                    height: 150,
                }}
            />
        </View>
    );
};


export default ActionBarImage;
