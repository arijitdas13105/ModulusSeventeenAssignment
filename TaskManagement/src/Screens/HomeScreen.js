import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import TaskCard from '../Components/TaskCard';
import HeaderNav from '../Components/HeaderNav';
import useTasks from '../Hooks/useTasks';
import LoadingSpinner from '../Components/LoadingSpinner';
import {BASE_URL} from '../utils/constant';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setTaskStats} from '../Redux/Slices/taskSlice';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {tasks, loading, fetchTasks} = useTasks();
  const token = useSelector(state => state.auth.userToken);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const completedTasks = tasks.filter(task => task.status === 'Completed');
  console.log('Pending Tasks Count:', pendingTasks.length);
  console.log('Completed Tasks Count:', completedTasks.length);
  const completionRate =
    totalTasks > 0
      ? ((completedTasks.length / totalTasks) * 100).toFixed(2)
      : 0;

  console.log('Completion Rate:', `${completionRate}%`);
  useEffect(() => {
    dispatch(
      setTaskStats({
        totalTasks,
        pendingTasksCount: pendingTasks.length,
        completedTasksCount: completedTasks.length,
      }),
    );
  }, [tasks, dispatch]);

  const handleMarkComplete = async taskId => {
    try {
      console.log('Marking task complete:', taskId);

      const response = await axios.put(
        `${BASE_URL}/task/updateTask/${taskId}`,
        {status: 'Completed'},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Task updated successfully:', response.data);
      Alert.alert('Success', 'Task marked as completed!');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      Alert.alert('Error', 'Failed to update the task. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <HeaderNav />

      {totalTasks === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks found.</Text>
          <Text style={styles.noTasksText}>
            Click on the '+' icon to add a new task.
          </Text>
        </View>
      ) : (
        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            <ScrollView style={styles.scrollView}>
              <SafeAreaView>
                {pendingTasks.length === 0 ? (
                  <View style={styles.noTasksContainer}>
                    <Text style={styles.noTasksText}>
                      No pending tasks found.
                    </Text>
                    <Text style={styles.noTasksText}>
                      Congratulations! You have completed all your tasks.
                    </Text>
                  </View>
                ) : (
                  <TaskCard
                    tasks={pendingTasks}
                    onMarComplete={handleMarkComplete}
                  />
                )}
              </SafeAreaView>
            </ScrollView>
          </View>

          {/* Completed Tasks Section */}
          <View style={[styles.section, styles.completedSection]}>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            <ScrollView style={styles.scrollView}>
              <SafeAreaView>
                {completedTasks.length === 0 ? (
                  <View style={styles.noTasksContainer}>
                    <Text style={styles.noTasksText}>
                      No completed tasks found.
                    </Text>
                    <Text style={styles.noTasksText}>
                      Complete your task ASAP.
                    </Text>
                  </View>
                ) : (
                  <TaskCard tasks={completedTasks} />
                )}
              </SafeAreaView>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: width * 0.05, // 5% padding on left and right //10
    marginTop: height * 0.02, // 2% from the top //20
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  section: {
    flex: 1,
    marginBottom: height * 0.02,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  completedSection: {
    marginTop: height * 0.02, // 2% margin top //20
  },
  sectionTitle: {
    fontSize: width * 0.06, // 18
    fontWeight: 'bold',
    marginBottom: height * 0.01, // 1% margin bottom //10
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
});

export default HomeScreen;
