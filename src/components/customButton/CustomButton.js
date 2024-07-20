import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({buttonTitle,style,onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  buttonText:{
    textAlign:"center"
  }
})