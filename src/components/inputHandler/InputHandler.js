import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputHandler = ({name,placeholderName,style,onChangeText,value,keyboardType,onBlur,secureTextEntry}) => {
  return (
    <View>
       <TextInput
                  name={name}
                  placeholder={placeholderName}
                  style={[styles.textInput ,style]}
                  onChangeText={onChangeText}
                  onBlur={onBlur}
                  value={value}
                  keyboardType={keyboardType}
                  secureTextEntry={secureTextEntry}
                />
    </View>
  )
}

export default InputHandler

const styles = StyleSheet.create({

      textInput: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        marginBottom:5
      },
})