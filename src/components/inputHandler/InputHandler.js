import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant/color/Colors';

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
      errorMsg,
      autoFocus = false,
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
          autoFocus={autoFocus}
        />
        {errorMsg ? (
          <View style={styles.errorMsgContainor}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}
      </View>
    );
  },
);

export default InputHandler;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    paddingHorizontal: 15,
    elevation: 5,
  },
  errorText: {
    color: 'red',
  },
  errorMsgContainor: {
    marginVertical: 3,
  },
});
