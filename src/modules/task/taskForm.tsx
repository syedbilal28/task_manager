import React, { useState } from 'react';
import { Input, Button } from 'antd';

const TaskForm = ({ addTask }) => {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
        addTask(taskText);
        setTaskText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '16px' }}>
        <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a new task"
            style={{ marginRight: '8px' }}
        />
        <Button type="primary" htmlType="submit">Add Task</Button>
        </form>
    );
};

export default TaskForm;
