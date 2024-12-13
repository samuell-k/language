import React, { useState } from 'react';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        eventLevel: '',
        topic: '',
        startTime: '',
        endTime: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Level: formData.eventLevel,
                    Topic: formData.topic,
                    Start_Time: formData.startTime,
                    End_Time: formData.endTime,
                    
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Event created successfully!');
                setError('');
                setFormData({
                    eventLevel: '',
                    topic: '',
                    startTime: '',
                    endTime: '',
                });
            } else {
                setError(data.error || 'Error creating event');
                setSuccessMessage('');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    const handleCancel = () => {
        setFormData({
            eventLevel: '',
            topic: '',
            startTime: '',
            endTime: '',
        });
        console.log('Event creation cancelled.');
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="mt-4 bg-light p-4 rounded">
                {/* Event Level */}
                <div className="mb-3">
                    <label htmlFor="eventLevel" className="form-label">Event Level</label>
                    <select
                        id="eventLevel"
                        name="eventLevel"
                        className="form-control"
                        value={formData.eventLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {/* Topic */}
                <div className="mb-3">
                    <label htmlFor="topic" className="form-label">Topic</label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        className="form-control"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Start Time */}
                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">Start Time</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        className="form-control"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* End Time */}
                <div className="mb-3">
                    <label htmlFor="endTime" className="form-label">End Time</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        className="form-control"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Error or success messages */}
                {error && <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Confirm</button>
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
