import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppBottomSheet from '../../components/customBottomSheet/BottomSheet';
import {useFormik} from 'formik';

import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/customButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/LoginSlice';
import InputHandler from '../../components/inputHandler/InputHandler';
import {IMAGES} from '../../constant/image/Image';
import {colors} from '../../constant/color/Colors';
import {addTaskData} from '../../redux/slices/TaskSlice';

const AddTaskSheet = React.forwardRef(({}, ref) => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectUser);
  const allUserTasks = useSelector(state => state?.task?.tasksByUser);

  const [open, setOpen] = useState(false);

  const addTask = values => {
    console.log(values, 'nEW values');
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
    ref.current.close();
  };

  const setYourPriority = () => {
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

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {taskName: '', date: new Date(), priority: 'Low'},
    onSubmit: values => addTask(values),
    validationSchema: Yup.object().shape({
      taskName: Yup.string().required('Task Name is required'),
      priority: Yup.string().required('Priority is required'),
      date: Yup.string().required('Date is required'),
    }),
  });
  return (
    <AppBottomSheet ref={ref}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Add New Task</Text>

        <InputHandler
          label="Task Name"
          placeholderName="Enter Task Name"
          onChangeText={handleChange('taskName')}
          onBlur={handleBlur('taskName')}
          value={values.taskName}
          errorMsg={errors.taskName && touched.taskName && errors.taskName}
        />
        <TouchableOpacity
          style={[styles.textInput, {width: '100%', marginBottom: 15}]}
          onPress={setYourPriority}>
          <Text>{values?.priority}</Text>
        </TouchableOpacity>
        {touched.priority && errors.priority && (
          <Text style={styles.errorText}>{errors.priority}</Text>
        )}
        <View>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.calanderStyles}>
            <View style={styles.textInput}>
              <Text>{values?.date?.toDateString() || 'Enter Date'}</Text>
            </View>

            <Image
              source={IMAGES.CALANDER}
              style={{height: 20, width: 20, left: 5}}
            />
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          minimumDate={new Date()}
          open={open}
          date={values?.date || null}
          mode="date"
          onConfirm={selectedDate => {
            setOpen(false);
            const formattedDate = selectedDate.toLocaleDateString();
            setFieldValue('date', formattedDate);
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
      </View>
    </AppBottomSheet>
  );
});

export default AddTaskSheet;

const styles = StyleSheet.create({
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
