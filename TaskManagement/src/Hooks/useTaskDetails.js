
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useNavigation } from '@react-navigation/native';

export const useTaskDetails = (taskId,  fetchTasks ) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.userToken);
  const navigation=useNavigation()
  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/task/getTaskById/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTask(response.data.task);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching task details:', error);
      Alert.alert('Error', 'Failed to load task details.');
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${BASE_URL}/task/deleteTask/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Success', 'Task deleted successfully.');
      fetchTasks();  
      navigation.navigate('Home');  
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  return { task, loading, fetchTaskDetails, deleteTask };
};
