/*
File name: loginScreen
Des: user login
*/

import React, { useState } from 'react';
import { View } from 'react-native';
import Button from '../../shared/common_components/button'
import FormTextInput from '../../shared/common_components/textInput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../navigation/mainNavigation'
import {styles} from '../../shared/CSS/globalCSS'
export default function loginScreen({ navigation }) {
    //State
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = React.useContext(AuthContext);
    //Saving user data in AsyncStorage
    const _checkLogin = async () => {
        if (userName === 'Admin' && password === '12345') {
            await AsyncStorage.setItem('userToken', "dummy-auth-token")
            await AsyncStorage.setItem('userName', userName)

            signIn({ userName, password })
        } else {
            alert('Please check your login credentails')
        }
    }
    //Render
    return (
        <View style={styles.container}>
            <FormTextInput
                value={userName}
                onChangeText={(text) => { setUserName(text) }}
                placeholder={'USERNAME'} />
            <FormTextInput
                value={password}
                onChangeText={(text) => { setPassword(text) }}
                placeholder={'PASSWORD'}
                secureTextEntry />
            <Button label={'LOGIN'} onPress={() => _checkLogin()} />
        </View>
    )
}



