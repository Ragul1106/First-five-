// src/components/DynamicList.js
import React, { useState } from 'react';
import 'animate.css';

const DynamicList = () => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleAdd = () => {
    if (current.trim() === '') {
      setError(true);
      setMessage('Item cannot be empty!');
      return;
    }

    if (editIndex !== null) {
      handleUpdate();
      return;
    }

    const updatedItems = [...items, current.trim()];
    setItems(updatedItems);
    setHighlightIndex(updatedItems.length - 1);
    setCurrent('');
    setError(false);
    setMessage('Item added successfully 🎉');
    resetMessage();
  };

  const handleUpdate = () => {
    if (current.trim() === '') {
      setError(true);
      setMessage('Item cannot be empty!');
      return;
    }

    const updated = [...items];
    updated[editIndex] = current.trim();
    setItems(updated);
    setHighlightIndex(editIndex);
    setCurrent('');
    setEditIndex(null);
    setError(false);
    setMessage('Item updated successfully ✅');
    resetMessage();
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
    setMessage('Item deleted ❌');
    if (editIndex === index) setEditIndex(null);
    resetMessage();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrent(items[index]);
    setError(false);
  };

  const handleClearAll = () => {
    setItems([]);
    setCurrent('');
    setEditIndex(null);
    setMessage('All items cleared 🔄');
    resetMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const resetMessage = () => {
    setTimeout(() => {
      setMessage('');
      setError(false);
      setHighlightIndex(null);
    }, 2000);
  };

  return (
    <div className="text-center animate__animated animate__fadeIn">
      <h2 className="mb-4">🧭 Dynamic List</h2>

      <div className="card p-4 mx-auto shadow" style={{ maxWidth: '500px' }}>
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={handleKeyPress}
            className={`form-control ${error ? 'is-invalid animate__animated animate__shakeX' : ''}`}
            placeholder="Type an item and press Enter"
          />
          <button
            className={`btn ${editIndex !== null ? 'btn-warning' : 'btn-success'}`}
            onClick={handleAdd}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        {message && (
          <div className={`alert ${error ? 'alert-danger' : 'alert-success'} py-2 animate__animated animate__fadeInDown`}>
            {message}
          </div>
        )}

        <ul className="list-group mb-3">
          {items.length === 0 ? (
            <li className="list-group-item text-muted">No items yet.</li>
          ) : (
            items.map((item, index) => (
              <li
                key={index}
                className={`list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeInUp ${highlightIndex === index ? 'bg-warning bg-opacity-25' : ''}`}
              >
                <span>{item}</span>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {items.length > 0 && (
          <button className="btn btn-outline-danger w-100" onClick={handleClearAll}>
            🗑️ Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicList;
