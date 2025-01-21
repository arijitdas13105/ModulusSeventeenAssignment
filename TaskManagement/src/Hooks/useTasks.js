import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useSelector } from 'react-redux';

const useTasks = ( ) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.userToken);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/task/getAllTasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  return { tasks, loading, fetchTasks };
};

export default useTasks;
