import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", rollNumber: "",department: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedUsers;
    if (editingIndex !== null) {
      // Update the existing user
      updatedUsers = users.map((user, index) =>
        index === editingIndex ? currentUser : user
      );
      setEditingIndex(null);
    } else {
      // Add a new user
      updatedUsers = [...users, currentUser];
    }
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setCurrentUser({ name: "", email: "", rollNumber: "", department: "" });
  };

  const handleEdit = (index) => {
    setCurrentUser(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="container mt-5">
      <h2>Student Data Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={currentUser.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={currentUser.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Roll Number</label>
          <input
            type="number"
            className="form-control"
            name="rollNumber"
            value={currentUser.rollNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={currentUser.department}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rollNumber}</td>
              <td>{user.department}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
