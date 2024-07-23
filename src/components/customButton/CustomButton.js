import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant/color/Colors';

const CustomButton = ({buttonTitle, style, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.BUTTONTEXT,
  },
  buttonStyle: {
    backgroundColor: colors.DUTCHWHITE,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
});
