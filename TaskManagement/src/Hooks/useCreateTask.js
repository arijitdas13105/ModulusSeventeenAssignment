
import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../utils/constant';
import { useSelector } from 'react-redux';

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector(state => state.auth.userToken);
  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);  

    try {
      const response = await axios.post(`${BASE_URL}/task/createTask`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        Alert.alert('Success', 'Task created successfully!');
        return response.data; 
      }
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      setError(error.message || 'Something went wrong');
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { createTask, loading, error };
};
