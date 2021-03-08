/*
File name: button
Des: common button component
*/

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function button(props){
    const{label, onPress} = props
    return(
        <TouchableOpacity onPress={onPress} style={{width:'50%', alignItems:'center', justifyContent:'center', backgroundColor:'#fff', alignSelf:'center', borderRadius:15}}>
            <Text style={{padding:7}}>{label}</Text>
        </TouchableOpacity>
    )
} 

