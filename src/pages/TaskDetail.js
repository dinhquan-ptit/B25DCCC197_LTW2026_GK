import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkTimer from '../components/WorkTimer';

const TaskDetail = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div>
        <p>Không tìm thấy công việc</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chi tiết công việc</h2>
      <p>Tên công việc: {task.title}</p>
      <p>Người làm: {task.assignee}</p>
      <p>Mức ưu tiên: {task.priority}</p>
      <p>Số giờ: {task.hours}</p>
      <p>Trạng thái: {task.done ? 'Đã xong' : 'Đang làm'}</p>
      <WorkTimer />
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default TaskDetail;