import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../constant/color/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IMAGES} from '../../constant/image/Image';

const CustomTaskCard = ({onDelete, item, onComplete}) => {
  return (
    <View style={styles.task}>
      <TouchableOpacity style={styles.checkbox} onPress={onComplete}>
        <Image
          source={item?.isCompleted == true ? IMAGES.CHECK : IMAGES.UNCHECK}
          style={styles.checkImage}
        />
      </TouchableOpacity>
      <View style={{marginBottom: 10}}>
        <Text style={styles.taskText}>
          {item?.text} - {item?.priority} - {item?.date}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  taskListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'black',
    // borderWidth: 1,
    margin: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  addTask: {
    color: 'white',
  },
  checkImage: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: colors.DUTCHWHITE,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 6,
  },
  calanderStyles: {
    flexDirection: 'row',
  },
});

{
  /* <View style={styles.task}>
<TouchableOpacity
  style={styles.checkbox}
  onPress={() => toggleTaskCompletion(item)}>
  <Image source={IMAGES.CHECK} style={styles.checkImage} />
</TouchableOpacity>
<View style={{marginBottom: 10}}>
  <Text style={styles.taskText}>
    {item.text} - {item.priority} - {item.date}
  </Text>
</View>
<TouchableOpacity
  style={styles.deleteButton}
  onPress={() => deleteTask(item.id)}>
  <Text>Delete</Text>
</TouchableOpacity>
</View> */
}
