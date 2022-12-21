import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com';

const convertFromApi = (apiTask) => {
  const { is_complete: isComplete, id, title, description } = apiTask;
  const newTask = { isComplete, description, id, title };
  return newTask;
};

const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTaskApi = (id) => {
  return axios
    .delete(`${kBaseUrl}/tasks/${id}`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const addNewTaskApi = () => {
  const requestBody = { title: '', description: '' };

  return axios
    .post(`${kBaseUrl}/tasks`, requestBody)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const taskMarkCompleteApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const taskMarkIncompleteApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi().then((tasks) => {
      setTaskData(tasks);
    });
  };

  useEffect(() => {
    // data fetching code
    getAllTasks();
  }, []);

  const toggleComplete = (id) => {
    setTaskData((taskData) =>
      taskData.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
  };

  const removeTask = (id) => {
    setTaskData((taskData) =>
      taskData.filter((task) => {
        return task.id != id;
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onToggleComplete={toggleComplete}
            onRemoveTask={removeTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
