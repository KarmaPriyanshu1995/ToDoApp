import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTaskCard from '../customTaskCards/CustomTaskCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/LoginSlice';
import {addTaskData} from '../../redux/slices/TaskSlice';

const CustomTaskList = ({headerComponent, data}) => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectUser);
  const allUserTasks = useSelector(state => state?.task?.tasksByUser);

  const currUserTasks = allUserTasks[currUser?.email];
  console.log('currUserTasks', JSON.stringify(currUserTasks, null, 2));

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
            try {
              let userEmail = currUser?.email;
              console.log(
                'currUserTasks',
                JSON.stringify(currUserTasks, null, 2),
              );

              const temp = currUserTasks.filter(task => task?.id !== taskId);
              console.log(temp, '[][][][][][][][][][]');
              let modifiedData = {
                ...allUserTasks,
                [userEmail]: temp,
              };
              dispatch(addTaskData(modifiedData));
            } catch (err) {
              console.log('err', err);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  const toggleTaskCompletion = item => {
    try {
      let userEmail = currUser?.email;

      let updatedTask = JSON.parse(JSON.stringify(currUserTasks));

      outerloop: for (task of updatedTask) {
        if (task?.id === item?.id) {
          console.log('inside');

          task.isCompleted = !task?.isCompleted;
          break outerloop;
        }
        console.log('innn');
      }

      console.log('updatedTask', JSON.stringify(updatedTask, null, 2));
      let temp = {
        ...allUserTasks,
        [userEmail]: [...updatedTask],
      };

      dispatch(addTaskData(temp));
    } catch (err) {
      console.log('toggleTaskCompletion err', err);
    }
  };
  return (
    <FlatList
      overScrollMode="never"
      style={{flex: 1, marginBottom: 20}}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={{backgroundColor: 'white'}}
      data={data}
      keyExtractor={item => item.id}
      stickyHeaderIndices={[0]}
      renderItem={({item, index}) => (
        <CustomTaskCard
          item={item}
          onComplete={() => toggleTaskCompletion(item)}
          onDelete={() => deleteTask(item.id)}
        />
      )}
      ItemSeparatorComponent={() => <View style={{borderBottomWidth: 1}} />}
    />
  );
};

export default CustomTaskList;

const styles = StyleSheet.create({});
