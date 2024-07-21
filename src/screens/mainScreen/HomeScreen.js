import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/customButton/CustomButton';
import InputHandler from '../../components/inputHandler/InputHandler';
import { IMAGES } from '../../constant/image/Image';
import { colors } from '../../constant/color/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/slices/LoginSlice';
import { signOut } from '../../redux/slices/SignUpSlice';
import DatePicker from 'react-native-date-picker'
import { addTaskData, TaskIsCompleted } from '../../redux/slices/TaskSlice';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const userCompleted = useSelector((state) => state.task.tasksByUser);
  console.log(userCompleted)
  
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [priority, setPriority] = useState('Low');
  const signupData = useSelector(state => state.signUp.users);
  const user = signupData.find(user => user.email);
  const userId = user ? user.email : null; 
  
  const tasksByUser = useSelector((state) => state.task);
  const taskCollection = tasksByUser.tasksByUser;
  
  const shyamTasks = taskCollection[userId];
  const [tasks, setTasks] = useState(shyamTasks || []);
  
 
  
  useEffect(() => {
    if (userId) {
      // setTasks(shyamTasks);
    }
  }, [userId, taskCollection]);

  const addTask = (values) => {
    const { taskName, date,priority } = values;
      const newTask = {
        id: Date.now().toString(),
        text: taskName,
        priority,
        date,
      };
      setTasks([...tasks, newTask]);
      dispatch(addTaskData({ userId, task: newTask }));
      setModalVisible(false);
   
  };
  
  
  const completeTask = (taskIndex) => {
    const task = tasks[taskIndex];
    const temp = { ...task };
    setCompletedTasks([...completedTasks, temp]);
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  
    const userId = user ? user.email : null;
  
    if (userId) {
      dispatch(TaskIsCompleted({ userId, taskIndex }));
    }
  };

  const deleteTask = (taskId) => {
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
            setTasks(tasks.filter((task) => task.id !== taskId));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const setYourPriority = (setFieldValue) => {
    Alert.alert(
      'Set Priority',
      'Select Priority',
      [
        { text: 'High', onPress: () => setFieldValue('priority', 'High') },
        { text: 'Medium', onPress: () => setFieldValue('priority', 'Medium') },
        { text: 'Low', onPress: () => setFieldValue('priority', 'Low') },
      ],
      { cancelable: true }
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleLogout = () => {
    dispatch(signOut({userId}));
    dispatch(logout());
    
  };
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: "red", marginVertical: 20, justifyContent: "flex-end", alignSelf: "flex-end", padding: 10, borderRadius: 5 }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>LogOut</Text>
      </TouchableOpacity>
      <Text style={styles.header}>ToDo App</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item,index }) => (
          <View style={styles.task}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => completeTask(index)}
            >

              <Image source={IMAGES.UNCHECK} style={styles.checkImage} />
            </TouchableOpacity>
            <View style={{ marginBottom: 10 }}>

              <Text style={styles.taskText}>
                {item.text} - {item.priority} - {item.date}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={
          <Text style={styles.taskListHeader}>Today's Tasks</Text>
        }
      />
      {completedTasks.length > 0 && (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.task}>
              <Text style={styles.taskText}>{item.text}</Text>
            </View>
          )}
          ListHeaderComponent={
            <Text style={styles.taskListHeader}>Completed Tasks</Text>
          }
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addTask}>Add Task</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Task</Text>
          <Formik
            initialValues={{ taskName: '', date: '', priority: 'Low' }}
            onSubmit={(values) =>  addTask(values)}
            validationSchema={Yup.object().shape({
              taskName: Yup.string().required('Task Name is required'),
              date: Yup.string().required('Date is required'),
            })}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <InputHandler
                  label="Task Name"
                  placeholder="Enter Task Name"
                  onChangeText={handleChange('taskName')}
                  onBlur={handleBlur('taskName')}
                  value={values.taskName}
                />
                {touched.taskName && errors.taskName && (
                  <Text style={styles.errorText}>{errors.taskName}</Text>
                )}

                <TouchableOpacity
                  style={styles.input}
                  onPress={() =>
                   
                    setYourPriority(handleChange)
                  }
                
                >
                  <Text>{priority}</Text>
                </TouchableOpacity>
              <View style={styles.calanderStyles}>
              <InputHandler
                  label="Date"
                  onChangeText={handleChange('date')}
                  onBlur={handleBlur('date')}
                  value={values.date || (date ? date.toLocaleDateString() : '')}
                 style={{width:220,color:"black"}}
                />
                  <TouchableOpacity onPress={() => setOpen(true)} style={{justifyContent:"center",left:5}}>
               <Image source={IMAGES.CALANDER} style={{height:20,width:20}}/>
               </TouchableOpacity>
              </View>
               
                  <DatePicker
                    modal
                    minimumDate={new Date()}
                    open={open}
                    date={date}
                    onConfirm={(selectedDate) => {
                      setOpen(false);
                setDate(selectedDate);
                const formattedDate = selectedDate.toLocaleDateString();
                handleChange('date')(formattedDate);
                    }}
                    onCancel={() => {
                      setOpen(false)
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
                <CustomButton
                  style={styles.buttonStyle}
                  buttonTitle="Cancel"
                  onPress={() => setModalVisible(false)}
                />
              </>
            )}
          </Formik>
        </View>
      </Modal>
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
    margin: 10
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 6
  },
  calanderStyles:{
    flexDirection:"row",
   
   
  }
});

export default HomeScreen;
