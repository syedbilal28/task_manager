import React, { FC, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { Checkbox, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


const ItemType = 'TASK';


interface TaskProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  index: number;
  moveTask: (fromIndex: number, toIndex: number) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}


const Task: FC<TaskProps> = ({ task, index, moveTask, toggleTask, removeTask }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px', 
        border: '1px solid #ccc', 
        marginBottom: '8px', 
        backgroundColor: '#fff', 
        opacity: isDragging ? 0.5 : 1 
      }}
    >
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1, marginLeft: '8px' }}>
        {task.text}
      </span>
      <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} style={{marginRight: "15px"}}/>
      <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => removeTask(task.id)} />
    </div>
  );
};

export default Task;
