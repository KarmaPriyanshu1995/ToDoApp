import { StyleSheet, View } from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
const CustomBottomSheet = React.forwardRef(({ component,height=260 }, ref) => {
  return (
    <View style={{flex:1}}>
      <RBSheet
        ref={ref}
        height={height}
        // closeOnPressMask={true}
        // closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
         
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        {component}
      </RBSheet>
    </View>
 
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({});
