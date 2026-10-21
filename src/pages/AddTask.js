import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Trung bình');
  const [hours, setHours] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !assignee.trim() || !hours) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }
    const numHours = Number(hours);
    if (isNaN(numHours) || numHours < 1 || numHours > 40 || !Number.isInteger(numHours)) {
      setErrorMsg('Số giờ phải từ 1 đến 40');
      return;
    }

    setErrorMsg('');
    onAddTask({
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: numHours,
      done: false,
    });

    navigate('/tasks', { replace: true });
  };

  return (
    <div>
      <h2>Thêm công việc mới</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên công việc: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Người làm: </label>
          <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
        </div>
        <div>
          <label>Mức ưu tiên: </label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Số giờ ước tính: </label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddTask;