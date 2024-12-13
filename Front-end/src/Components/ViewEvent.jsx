import React, { useState, useEffect } from 'react';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch all events 
    useEffect(() => {
        fetchEvents();
    }, []);

   
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/events');
            const data = await response.json();
            if (response.ok) {
                setEvents(data);
                setError('');
            } else {
                setError('Error fetching events');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    // Delete Event
    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/event/${eventId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Event deleted successfully!');
                setError('');
                fetchEvents(); 
            } else {
                setError(data.error || 'Error deleting event');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

   
    const handleJoinEvent = (eventTopic) => {
        const eventCode = prompt(`Enter the code to join the event: "${eventTopic}"`);
        if (eventCode === '123') {
            alert(`Welcome to the event: ${eventTopic}!`);
        } else {
            alert('Invalid code. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">All Events</h1>

         
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

         
            <div className="mt-4">
                {events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Topic</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id}>
                                    <td>{event.Level}</td>
                                    <td>{event.Topic}</td>
                                    <td>{new Date(event.Start_Time).toLocaleString()}</td>
                                    <td>{new Date(event.End_Time).toLocaleString()}</td>
                                    <td>
                                       
                                        <div className="btn-group" role="group" aria-label="Event actions">
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => window.location.href = `/edit-event/${event._id}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                Delete
                                            </button>
                                          
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleJoinEvent(event.Topic)}
                                            >
                                                Join Event
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AllEvents;
