import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const AppBottomSheet = React.forwardRef(({children}, ref) => {
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      enablePanDownToClose>
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default AppBottomSheet;

const styles = StyleSheet.create({});
