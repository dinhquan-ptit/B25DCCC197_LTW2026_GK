import React from 'react';
import { PRIORITIES } from '../data';

const FilterBar = ({ query, onQueryChange, priority, onPriorityChange }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ marginRight: '10px' }}>
        Tìm kiếm: <input type="text" value={query} onChange={onQueryChange} />
      </label>
      <label>
        Mức ưu tiên: {' '}
        <select value={priority} onChange={onPriorityChange}>
          <option value="Tất cả">Tất cả</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FilterBar;