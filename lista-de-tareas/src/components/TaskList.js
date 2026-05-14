import React, { useState, useEffect } from 'react';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    removeTask(index);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      const newTasks = [...tasks];
      const draggedTask = newTasks[draggedIndex];
      newTasks.splice(draggedIndex, 1);
      newTasks.splice(targetIndex, 0, draggedTask);
      setTasks(newTasks);
      setDraggedIndex(null);
    }
  };

  return (
    <div className="container-tasklist">
      <div className='Lista'>
        
        <h1>Lista de tareas</h1>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyUp={(e) => { if (e.key === 'Enter') addTask(); }}
          placeholder="Agregar nueva tarea"
        />
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className={draggedIndex === index ? 'dragging' : ''}
              style={{ opacity: draggedIndex === index ? 0.5 : 1 }}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(index)}
                  className="task-checkbox"
                />
                <span className={task.completed ? 'task-completed' : ''}>
                  {task.text}
                </span>
              </div>
              <button onClick={() => completeTask(index)} className="btn-complete">Tarea finalizada</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;