const BUILD_TAG = "zr-5093";

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('Tất cả');

  const handleQueryShift = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('gk_tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
        setLoading(false);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    const controller = new AbortController();
    axios.get('/data/tasks.json', { signal: controller.signal })
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const handleToggleDone = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (newTaskData) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;
    const newTask = { id: maxId + 1, ...newTaskData };
    setTasks([...tasks, newTask]);
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Đang tải...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px' }}>Không tải được dữ liệu</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home tasks={tasks} />} />
          <Route 
            path="tasks" 
            element={
              <TaskList 
                tasks={tasks} 
                onToggleDone={handleToggleDone} 
                onDelete={handleDelete}
                query={query}
                handleQueryShift={handleQueryShift}
                priority={priority}
                setPriority={setPriority}
              />
            } 
          />
          <Route path="tasks/new" element={<AddTask onAddTask={handleAddTask} />} />
          <Route path="tasks/:id" element={<TaskDetail tasks={tasks} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;