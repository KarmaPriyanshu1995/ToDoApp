import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Formik } from 'formik';
import ModalSelector from 'react-native-modal-selector';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/slices/TaskSlice';
import InputHandler from '../../components/inputHandler/InputHandler';


const AddTaskScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const priorities = [
    { key: 0, label: 'Hard' },
    { key: 1, label: 'Medium' },
    { key: 2, label: 'Low' },
  ];

  const handleSubmit = (values) => {
    const newTask = {
      id: Date.now().toString(),
      text: values.taskName,
      priority: values.priority,
      date: values.date,
    };
    dispatch(addTask(newTask));
    navigation.navigate('ToDo', { newTask });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <Formik
        initialValues={{ taskName: '', priority: '', date: '' }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.taskName) {
            errors.taskName = 'Required';
          }
          if (!values.priority) {
            errors.priority = 'Required';
          }
          if (!values.date) {
            errors.date = 'Required';
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <InputHandler
              name="taskName"
              placeholderName="Task Name"
              style={styles.input}
              onChangeText={handleChange('taskName')}
              onBlur={handleBlur('taskName')}
              value={values.taskName}
            />
            {errors.taskName && <Text style={styles.errorText}>{errors.taskName}</Text>}

            <ModalSelector
              data={priorities}
              initValue="Select Priority"
              onChange={(option) => handleChange('priority')(option.label)}
              style={styles.input}
              initValueTextStyle={{ color: 'gray' }}
            >
              <InputHandler
                name="priority"
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
                editable={false}
                placeholder="Select Priority"
                value={values.priority}
              />
            </ModalSelector>
            {errors.priority && <Text style={styles.errorText}>{errors.priority}</Text>}

            <InputHandler
              name="date"
              placeholderName="Task Date (e.g., 2024-07-15)"
              style={styles.input}
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
              value={values.date}
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            <Button title="Add Task" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default AddTaskScreen;
