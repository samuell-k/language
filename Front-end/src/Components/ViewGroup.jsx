import React, { useState, useEffect } from 'react';

const ViewGroups = () => {
    const [groups, setGroups] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); 

 
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/groups');
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                const data = await response.json();
                setGroups(data); 
                setLoading(false);
            } catch (err) {
                setError(err.message); 
                setLoading(false);
            }
        };

        fetchGroups(); 
    }, []); 

 
    const handleDelete = async (groupId) => {
      
        const isConfirmed = window.confirm('Are you sure you want to delete this group?');

        if (!isConfirmed) {
            return; 
        }

        try {
           
            const response = await fetch(`http://localhost:8000/api/group/${groupId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
    
                setSuccessMessage('Group deleted successfully!');
                setError(null); 
                fetchGroups(); 
            } else {
             
                setError(data.error || 'Error deleting group');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

 
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">View Groups</h1>

          
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.groupName}</td>
                            <td>{group.description}</td>
                            <td>
                             
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(group.id)}
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

export default ViewGroups;
