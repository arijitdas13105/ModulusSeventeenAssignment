import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/constant';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const TaskCard = ({tasks, onMarComplete}) => {
  const navigation = useNavigation();

  const getPriorityColor = priority => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#FF4B4B';
      case 'medium':
        return '#FFA500';
      case 'low':
        return '#4CAF50';
      default:
        return '#808080';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Pending':
        return '#FF4B4B';
      case 'In Progress':
        return '#FFA500';
      case 'Completed':
        return '#4CAF50';
      default:
        return '#808080';
    }
  };
  return (
    <View>
      {tasks.map(item => {
        const deadLine = new Date(item?.deadLine);

        const formattedDate = deadLine.toLocaleDateString();

        const formattedTime = deadLine.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        console.log(formattedTime);
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              console.log('taskId in taskcard', item._id);
              navigation.navigate('TaskDetails', {taskId: item._id});
            }}>
            <View style={styles.containerTop}>
              <Text style={styles.Title}>{item.title}</Text>

              {onMarComplete && (
                <TouchableOpacity
                  style={styles.markCompleted}
                  onPress={() => onMarComplete(item._id)}>
                  <Text style={styles.priorityText}>Mark Complete</Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 0,
              }}>
              <View
                style={[
                  styles.priorityContainer,
                  {backgroundColor: getPriorityColor(item.priority)},
                ]}>
                <Text style={styles.priorityText}>
                  {item.priority} Priority
                </Text>
              </View>
              <View
                style={[
                  styles.priorityContainer,
                  {backgroundColor: getStatusColor(item.status)},
                ]}>
                <Text style={styles.priorityText}>{item.status}</Text>
              </View>
              <View style={styles.DateTimeHolder}>
                <View>
                  <Text style={styles.priorityText}>🗓️{formattedDate}</Text>
                </View>

                <View>
                  <Text style={styles.priorityText}>⌛{formattedTime}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    gap: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  containerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    fontSize: 20,
  },
  priorityContainer: {
    padding: 5,
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  DateTimeHolder: {
    padding: 5,
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
  },
  markCompleted: {
    padding: 5,
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#9fe3b6',
  },
});
