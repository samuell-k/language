import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Button, Nav, Modal, Table } from 'react-bootstrap'; 
import { FaBars, FaSignOutAlt } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import profilePic from '/src/assets/images/b.png'; 
import ViewEvent from './ViewEvent'; 
import CreatePayment from './CreatePayment'; 

const styles = {
    container: {
        color: '#333',
        minHeight: '100vh',
        overflow: 'hidden',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#343A40',
        padding: '20px',
        height: '100%',
        transition: 'all 0.3s ease',
        position: 'relative',
    },
    navLink: {
        color: '#ffffff',
        textDecoration: 'none',
        padding: '10px 15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    contentArea: {
        padding: '20px',
        height: '100%',
    },
    profilePic: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginBottom: '20px',
    },
    table: {
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'center',
    },
    tableRowPending: {
        backgroundColor: '#f9f9f9',
    },
    tableRowCompleted: {
        backgroundColor: '#e9f7ef',
    },
    
};

const dummyPendingData = [
    { id: 1, name: 'Pending Event 1', status: 'Pending' },
    { id: 2, name: 'Pending Event 2', status: 'Pending' },
    { id: 3, name: 'Pending Event 3', status: 'Pending' },
];

const dummyHistoryData = [
    { id: 1, name: 'Completed Event 1', status: 'paid' },
    { id: 2, name: 'Completed Event 2', status: 'paid' },
    { id: 3, name: 'Completed Event 3', status: 'paid' },
];

function StudentPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('Learning Dashboard');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showJoinEventModal, setShowJoinEventModal] = useState(false);
    const [eventCode, setEventCode] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userSession = sessionStorage.getItem('user');
        if (!userSession) {
            navigate('/login');
        }
    }, [navigate]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    const handleJoinEvent = () => {
        if (eventCode.trim() === '') {
            alert('Please enter a valid event code');
        } else if (!selectedEvent) {
            alert('Please select an event first');
        } else {
            alert(`Joining event "${selectedEvent.name}" with code: ${eventCode}`);
            setShowJoinEventModal(false);
        }
    };

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        setShowJoinEventModal(true);
    };

    return (
        <div style={styles.container}>
            <Container fluid style={{ height: '100vh', padding: '0' }}>
                <Row style={{ height: '100%' }}>
                    {/* Toggle Menu Button */}
                    <Button
                        variant="outline-light"
                        onClick={toggleMenu}
                        className="d-md-none mb-3"
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '-260px',
                            zIndex: '1000',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                        }}
                    >
                        <FaBars />
                    </Button>

                    {/* Sidebar Menu */}
                    <Col xs={12} md={4} className={`sidebar ${isMenuOpen ? '' : 'd-none d-md-block'}`} style={styles.sidebar}>
                        <div className="text-center">
                            <img src={profilePic} alt="Profile" style={styles.profilePic} />
                        </div>
                        <Nav className="flex-column">
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => handleSectionChange('Learning Dashboard')}
                                >
                                    Learning Dashboard
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => handleSectionChange('Join Event')}
                                >
                                    Join Event
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => handleSectionChange('Payment')}
                                >
                                    Payment
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => handleSectionChange('Pending')}
                                >
                                    Pending
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => handleSectionChange('History')}
                                >
                                    History
                                </Button>
                            </Nav.Item>
                        </Nav>
                        <div className="text-center my-4">
                            <Button variant="link" style={styles.navLink} onClick={() => setShowLogoutModal(true)}>
                                <FaSignOutAlt /> Logout
                            </Button>
                        </div>
                    </Col>

                    {/* Content Area */}
                    <Col xs={12} md={8} style={styles.contentArea}>
                        <h4 style={{ marginTop: '20px', color: '#000' }}>{activeSection}</h4>
                        <div>
                            {activeSection === 'Learning Dashboard' && (
                                <div>
                                    <h5>Welcome to the Learning Dashboard!</h5>
                                    <p>Here you can find your courses, upcoming events, and much more.</p>
                                    <div>
                                        <h6>Current Courses</h6>
                                        <ul>
                                            <li>Course 1</li>
                                            <li>Course 2</li>
                                            <li>Course 3</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h6>Upcoming Events</h6>
                                        <ul>
                                            <li>Event 1</li>
                                            <li>Event 2</li>
                                            <li>Event 3</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {activeSection === 'Join Event' && (
                                <ViewEvent onEventSelect={handleEventSelect} />
                            )}
                            {activeSection === 'Payment' && (
                                <div>
                                    <CreatePayment show={showPaymentModal} onHide={() => setShowPaymentModal(false)} />
                                </div>
                            )}
                            {activeSection === 'Pending' && (
                                <div>
                                    <Table striped bordered hover style={styles.table}>
    <thead>
        <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Status</th>
        </tr>
    </thead>
    <tbody>
        {dummyPendingData.map((item) => (
            <tr key={item.id} style={styles.tableRowPending}>
                <td style={styles.tableCell}>{item.id}</td>
                <td style={styles.tableCell}>{item.name}</td>
                <td style={styles.tableCell}>
                    <span
                        className={item.status === 'Pending' ? 'status-pending' : 'status-completed'}
                    >
                        {item.status}
                    </span>
                </td>
            </tr>
        ))}
    </tbody>
</Table>

                                </div>
                            )}
                            {activeSection === 'History' && (
                                <div>
                                   <Table striped bordered hover style={styles.table}>
    <thead>
        <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Status</th>
        </tr>
    </thead>
    <tbody>
        {dummyHistoryData.map((item) => (
            <tr key={item.id} style={styles.tableRowCompleted}>
                <td style={styles.tableCell}>{item.id}</td>
                <td style={styles.tableCell}>{item.name}</td>
                <td style={styles.tableCell}>
                    <span
                        className={item.status === 'Pending' ? 'status-pending' : 'status-completed'}
                    >
                        {item.status}
                    </span>
                </td>
            </tr>
        ))}
    </tbody>
</Table>

                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Logout Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Payment Modal */}
            {/* Ensure it's only shown when active section is 'Payment' */}
            {/* {activeSection === 'Payment' && (
                <CreatePayment show={showPaymentModal} onHide={() => setShowPaymentModal(false)} />
            )} */}
        </div>
    );
}

export default StudentPage;
