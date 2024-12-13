import React, { useState } from 'react';

const CreateGroup = () => {
    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
    });

    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(null); 
        setSuccess(null); 

        try {
          
            const response = await fetch('http://localhost:8000/api/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

          
            if (response.ok) {
                const data = await response.json();
                console.log('Group Created:', data);
                setSuccess('Group successfully created!');
                setFormData({ 
                    groupName: '', 
                    description: '',
                }); 
            } else {
                throw new Error('Failed to create group');
            }
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    const handleCancel = () => {
      
        setFormData({
            groupName: '',
            description: '',
        });
        console.log('Group creation cancelled.');
    };

    return (
        <div className="container mt-5" style={{ overflow: 'auto' }}>
            <h1 className="text-center">Create Group</h1>

            {/* Display success or error message */}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-4 bg-light p-4 rounded">
                {/* Group Name */}
                <div className="mb-3">
                    <label htmlFor="groupName" className="form-label">Group Name</label>
                    <input
                        type="text"
                        id="groupName"
                        name="groupName"
                        className="form-control"
                        value={formData.groupName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Confirm'}
                    </button>
                    
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;
