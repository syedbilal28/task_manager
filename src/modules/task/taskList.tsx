import React, { useState } from 'react';
import { Typography } from 'antd';
import Task  from './task.tsx';
import TaskForm from './taskForm.tsx';

export const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Learn React', completed: false },
    { id: '2', text: 'Build a Task List', completed: false }
  ]);

  const addTask = (text) => {
    const newTask = {
      id: `${tasks.length + 1}`,
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Typography.Title level={2}>Task List</Typography.Title>
      <TaskForm addTask={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
