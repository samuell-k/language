
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        console.log('Fetching teachers data...'); 
        const response = await axios.get('http://localhost:8000/teachers');
        console.log('Response data:', response.data);
        setTeachers(response.data.teachers); 
      } catch (err) {
        console.error('Error fetching teachers:', err); 
        setError('Error fetching teachers');
      }
    };

    fetchTeachers();
  }, []); 

  return (
    <div style={styles.container}>
      <h2>View Teachers</h2>

      {error && <div style={styles.error}>{error}</div>}

      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Email</th>
            <th style={styles.tableCell}>Username</th>
            <th style={styles.tableCell}>Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td style={styles.tableCell}>{teacher.Name}</td>
                <td style={styles.tableCell}>{teacher.Email}</td>
                <td style={styles.tableCell}>{teacher.Username}</td>
                <td style={styles.tableCell}>{teacher.Approval_Status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.tableCell}>
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


const styles = {
  container: {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default ViewTeacher;
