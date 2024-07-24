import React, {useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/customButton/CustomButton';
import InputHandler from '../../components/inputHandler/InputHandler';
import {IMAGES} from '../../constant/image/Image';
import {colors} from '../../constant/color/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectUser} from '../../redux/slices/LoginSlice';
import {signOut} from '../../redux/slices/SignUpSlice';
import DatePicker from 'react-native-date-picker';
import {addTaskData} from '../../redux/slices/TaskSlice';
import AppBottomSheet from '../../components/customBottomSheet/BottomSheet';
import CustomTaskList from '../../components/customTaskList/CustomTaskList';
import AddTaskSheet from './AddTaskSheet';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const bottomShetRef = useRef();
  const currUser = useSelector(selectUser);
  const allUserTasks = useSelector(state => state?.task?.tasksByUser);

  const [priority, setPriority] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const userId = currUser?.email;
  const currUserTasks = allUserTasks[currUser?.email];
  const pendingTasks = currUserTasks?.filter(
    task => task?.isCompleted === false,
  );
  const completedTasks = currUserTasks?.filter(
    task => task?.isCompleted == true,
  );

  const handleLogout = () => {
    dispatch(signOut({userId}));
    dispatch(logout());
  };
  const filteredTask = useMemo(() => {
    if (!!searchQuery) {
      let filteredPendingTask = pendingTasks.filter(item =>
        item.text
          ?.replace(/\s/g, '')
          ?.toLowerCase()
          .includes(searchQuery?.replace(/\s/g, '').toLowerCase()),
      );
      let filteredCompletedTask = completedTasks.filter(item =>
        item.text
          ?.replace(/\s/g, '')
          ?.toLowerCase()
          .includes(searchQuery?.replace(/\s/g, '').toLowerCase()),
      );
      return {
        pendingTasks: filteredPendingTask,
        completedTasks: filteredCompletedTask,
      };
    }
    return {pendingTasks, completedTasks};
  }, [pendingTasks, searchQuery, completedTasks]);

  const renderListHeader = headerName => {
    return <Text style={styles.taskListHeader}>{headerName}</Text>;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: 'red',
          marginVertical: 20,
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>LogOut</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchBar}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.header}>ToDo App</Text>
      <CustomTaskList
        headerComponent={() => renderListHeader('Pending Task')}
        data={filteredTask.pendingTasks || []}
      />
      <CustomTaskList
        headerComponent={() => renderListHeader('Completed Task')}
        data={filteredTask.completedTasks || []}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => bottomShetRef?.current?.expand()}>
        <Text style={styles.addTask}>Add Task</Text>
      </TouchableOpacity>
      <AddTaskSheet ref={bottomShetRef} />
    </View>
  );
};

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
    borderWidth: 1,
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
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: '90%',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    paddingHorizontal: 15,
    elevation: 5,
    justifyContent: 'center',
    // marginBottom: 20,
  },
});

export default HomeScreen;
