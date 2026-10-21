import React from 'react';

const Home = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.reduce((acc, task) => acc + (task.done ? 1 : 0), 0);
  const remainingHours = tasks.reduce((acc, task) => acc + (!task.done ? Number(task.hours) : 0), 0);

  return (
    <div>
      <h2>Công việc nhóm</h2>
      <p>Tổng số công việc: {totalTasks}</p>
      <p>Số công việc đã xong: {completedTasks}</p>
      <p>Tổng số giờ còn lại: {remainingHours}</p>
    </div>
  );
};

export default Home;