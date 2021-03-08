/*
File name: textInput
Des: common text input component
*/

import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

export default function textInput(props){
    const{ ...otherProps} = props

    return(
        <TextInput
        style={{width:'80%', backgroundColor:'black', alignSelf:'center', margin:10, borderRadius:25}}
        {...otherProps}/>
    )
}

