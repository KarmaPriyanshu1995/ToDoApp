import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
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
import {addTaskData, TaskIsCompleted} from '../../redux/slices/TaskSlice';
import AppBottomSheet from '../../components/customBottomSheet/BottomSheet';
import CustomTaskCard from '../../components/customTaskCards/CustomTaskCard';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const bottomShetRef = useRef();
  // const [completedTasks, setCompletedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priority, setPriority] = useState('Low');
  const signupData = useSelector(state => state.signUp.users);

  const user = signupData.find(user => user.email);
  console.log(signupData, 'acchathikha');
  const userId = user ? user.email : null;

  const tasksByUser = useSelector(state => state.task);
  const taskCollection = tasksByUser.tasksByUser;

  const shyamTasks = taskCollection[userId];
  const [tasks, setTasks] = useState(shyamTasks || []);

  const completeTask = taskIndex => {
    const task = tasks[taskIndex];
    const temp = {...task};
    setCompletedTasks([...completedTasks, temp]);
    setTasks(tasks.filter((_, index) => index !== taskIndex));

    const userId = user ? user.email : null;

    if (userId) {
      dispatch(TaskIsCompleted({userId, taskIndex}));
    }
  };

  const deleteTask = taskId => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setTasks(tasks.filter(task => task.id !== taskId));
          },
        },
      ],
      {cancelable: true},
    );
  };

  const setYourPriority = setFieldValue => {
    Alert.alert(
      'Set Priority',
      'Select Priority',
      [
        {text: 'High', onPress: () => setFieldValue('priority', 'High')},
        {text: 'Medium', onPress: () => setFieldValue('priority', 'Medium')},
        {text: 'Low', onPress: () => setFieldValue('priority', 'Low')},
      ],
      {cancelable: true},
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleLogout = () => {
    dispatch(signOut({userId}));
    dispatch(logout());
  };
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const currUser = useSelector(selectUser);
  const allUserTasks = useSelector(state => state?.task?.tasksByUser);

  console.log('allUserTasks', JSON.stringify(allUserTasks, null, 2));

  const currUserTasks = allUserTasks[currUser?.email];
  const pendingTasks = currUserTasks?.filter(
    task => task?.isCompleted == false,
  );
  const completedTasks = currUserTasks?.filter(
    task => task?.isCompleted == true,
  );

  const addTask = values => {
    let userEmail = currUser?.email;
    const {taskName, date, priority} = values;
    const newTask = {
      id: Date.now().toString(),
      text: taskName,
      priority,
      date,
      isCompleted: false,
    };
    let temp = {};

    if (allUserTasks?.[userEmail] !== undefined) {
      temp = {
        ...allUserTasks,
        [userEmail]: [...allUserTasks[userEmail], newTask],
      };
    } else {
      temp = {
        ...allUserTasks,
        [userEmail]: [newTask],
      };
    }
    dispatch(addTaskData(temp));
    bottomShetRef.current.close();
  };

  const toggleTaskCompletion = item => {
    try {
      let userEmail = currUser?.email;

      let updatedTask = currUserTasks?.map(task => {
        if (task?.id === item?.id) {
          return {
            ...task,
            isCompleted: !task?.isCompleted,
          };
        }
        return task;
      });
      let temp = {
        ...allUserTasks,
        [userEmail]: updatedTask,
      };

      dispatch(addTaskData(temp));
    } catch (err) {
      console.log('toggleTaskCompletion err', err);
    }
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
      <Text style={styles.header}>ToDo App</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={pendingTasks}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <CustomTaskCard
            item={item}
            onComplete={() => toggleTaskCompletion(item)}
            onDelete={() => () => deleteTask(item.id)}
          />
        )}
        ListHeaderComponent={
          <Text style={styles.taskListHeader}>Today's Tasks</Text>
        }
      />

      <FlatList
        data={completedTasks || []}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CustomTaskCard
            item={item}
            onComplete={() => toggleTaskCompletion(item)}
            onDelete={() => () => deleteTask(item.id)}
          />
        )}
        ListHeaderComponent={
          <Text style={styles.taskListHeader}>Completed Tasks</Text>
        }
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => bottomShetRef?.current?.expand()}>
        <Text style={styles.addTask}>Add Task</Text>
      </TouchableOpacity>
      <AppBottomSheet ref={bottomShetRef}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Task</Text>
          <Formik
            initialValues={{taskName: '', date: '', priority: 'Low'}}
            onSubmit={values => addTask(values)}
            validationSchema={Yup.object().shape({
              taskName: Yup.string().required('Task Name is required'),
              date: Yup.string().required('Date is required'),
            })}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <InputHandler
                  label="Task Name"
                  placeholder="Enter Task Name"
                  onChangeText={handleChange('taskName')}
                  onBlur={handleBlur('taskName')}
                  value={values.taskName}
                  errorMsg={
                    errors.taskName && touched.taskName && errors.taskName
                  }
                />
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setYourPriority(handleChange)}>
                  <Text>{priority}</Text>
                </TouchableOpacity>
                <View style={styles.calanderStyles}>
                  <InputHandler
                    label="Date"
                    onChangeText={handleChange('date')}
                    onBlur={handleBlur('date')}
                    value={
                      values.date || (date ? date.toLocaleDateString() : '')
                    }
                    style={{width: 330, color: 'black'}}
                  />
                  <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={{justifyContent: 'center', left: 5}}>
                    <Image
                      source={IMAGES.CALANDER}
                      style={{height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                </View>

                <DatePicker
                  modal
                  minimumDate={new Date()}
                  open={open}
                  date={date}
                  onConfirm={selectedDate => {
                    setOpen(false);
                    setDate(selectedDate);
                    const formattedDate = selectedDate.toLocaleDateString();
                    handleChange('date')(formattedDate);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                {touched.date && errors.date && (
                  <Text style={styles.errorText}>{errors.date}</Text>
                )}

                <CustomButton
                  style={styles.buttonStyle}
                  buttonTitle="Add Task"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </AppBottomSheet>
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
  },
});

export default HomeScreen;
