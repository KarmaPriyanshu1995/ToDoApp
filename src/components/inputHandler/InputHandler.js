import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputHandler = React.forwardRef(
  (
    {
      onSubmitEditing,
      name,
      placeholderName,
      style,
      onChangeText,
      value,
      keyboardType,
      onBlur,
      secureTextEntry,
    },
    ref,
  ) => {
    return (
      <View style={{marginBottom: 10}}>
        <TextInput
          name={name}
          placeholder={placeholderName}
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          onBlur={onBlur}
          ref={ref}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  },
);

export default InputHandler;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    // marginBottom:5
  },
});
