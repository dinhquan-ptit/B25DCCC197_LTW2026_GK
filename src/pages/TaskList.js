import React from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onToggleDone, onDelete, query, handleQueryShift, priority, setPriority }) => {
  const filteredTasks = tasks.filter((task) => {
    const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
    const matchesPriority = priority === 'Tất cả' || task.priority === priority;
    return matchesQuery && matchesPriority;
  });

  return (
    <div>
      <h2>Danh sách công việc</h2>
      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        priority={priority}
        onPriorityChange={(e) => setPriority(e.target.value)}
      />
      <p>Tìm thấy {filteredTasks.length} công việc</p>
      <TaskTable tasks={filteredTasks} onToggleDone={onToggleDone} onDelete={onDelete} />
    </div>
  );
};

export default TaskList;