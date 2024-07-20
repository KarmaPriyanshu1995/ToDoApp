import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomHeader = ({headerTitle}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleStyle}>{headerTitle}</Text>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    titleStyle:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:20,
        color:"black"
      },
})