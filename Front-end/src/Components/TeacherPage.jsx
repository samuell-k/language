import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Collapse, Nav, Modal } from 'react-bootstrap';
import { FaBars, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import profilePic from '/src/assets/images/b.png';
import CreateEvent from '../Components/CreateEvent';
import CreateGroup from '../Components/CreateGroup';
import ViewEvent from '../Components/ViewEvent';
import ViewGroup from '../Components/ViewGroup';
const styles = {
    container: {
        color: '#333',
        minHeight: '100vh',
        overflow: 'hidden',  
        display: 'flex', 
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#343A40',
        padding: '20px',
        height: '100%',
        transition: 'all 0.3s ease',
        position: 'relative',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)', 
        display: 'flex',
        flexDirection: 'column', 
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
        marginBottom: '5px',
    },
    contentArea: {
        padding: '20px',
        flex: 1, 
        height: '100%',
        overflow: 'auto', 
        backgroundColor: '#f8f9fa', 
        borderTop: '1px solid #ddd', 
    },
    submenu: {
        paddingLeft: '20px',
        paddingTop: '5px', 
    },
    profilePic: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginBottom: '20px',
        border: '2px solid #fff', 
    },
    sidebarToggle: {
        position: 'absolute',
        top: '80px',
        left: '-260px',
        zIndex: '1000',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ffffff',
    },
    logoutButton: {
        marginTop: 'auto', 
        color: '#ffffff',
        padding: '10px 15px',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoutIcon: {
        marginRight: '10px',
    },
};


function TeacherPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [expandedEvents, setExpandedEvents] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState(false);
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        if (activeSection !== section) {
            setActiveSection(section);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <Container fluid style={{ height: '100vh', padding: '0' }}>
                <Row style={{ height: '100%' }}>
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

                    <Col xs={12} md={4} className={`sidebar ${isMenuOpen ? "" : "d-none d-md-block"}`} style={styles.sidebar}>
                        <div className="text-center">
                            <img src={profilePic} alt="Profile" style={styles.profilePic} />
                        </div>
                        <Nav className="flex-column">
                            {/* Dashboard Section */}
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => handleSectionChange('Dashboard')}
                                >
                                    Dashboard
                                </Button>
                            </Nav.Item>

                            {/* Events Section */}
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => {
                                        setExpandedEvents(!expandedEvents);
                                        handleSectionChange('Events');
                                    }}
                                >
                                    Events {expandedEvents ? <FaChevronUp /> : <FaChevronDown />}
                                </Button>
                                <Collapse in={expandedEvents}>
                                    <Nav className="flex-column" style={styles.submenu}>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('Create Event')}>
                                                Create Event
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('View Event')}>
                                                View Event
                                            </Button>
                                        </Nav.Item>
                                    </Nav>
                                </Collapse>
                            </Nav.Item>

                            {/* Groups Section */}
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => {
                                        setExpandedGroups(!expandedGroups);
                                        handleSectionChange('Groups');
                                    }}
                                >
                                    Groups {expandedGroups ? <FaChevronUp /> : <FaChevronDown />}
                                </Button>
                                <Collapse in={expandedGroups}>
                                    <Nav className="flex-column" style={styles.submenu}>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('Create Group')}>
                                                Create Group
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('View Group')}>
                                                View Group
                                            </Button>
                                        </Nav.Item>
                                    </Nav>
                                </Collapse>
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
                            {activeSection === 'Dashboard' && (
                                <div className="container mt-5">
                                <h5>Dashboard Content</h5>
                                {/* Dashboard Overview */}
                                <div className="row mt-4">
                                    {/* Total Users Widget */}
                                    <div className="col-md-3">
                                        <div className="card bg-primary text-white">
                                            <div className="card-body">
                                                <h5 className="card-title">Total Users</h5>
                                                <p className="card-text">120</p>
                                            </div>
                                        </div>
                                    </div>
                            
                                    {/* Active Groups Widget */}
                                    <div className="col-md-3">
                                        <div className="card bg-success text-white">
                                            <div className="card-body">
                                                <h5 className="card-title">Active Groups</h5>
                                                <p className="card-text">10</p>
                                            </div>
                                        </div>
                                    </div>
                            
                                    {/* Upcoming Events Widget */}
                                    <div className="col-md-3">
                                        <div className="card bg-warning text-white">
                                            <div className="card-body">
                                                <h5 className="card-title">Upcoming Events</h5>
                                                <p className="card-text">5</p>
                                            </div>
                                        </div>
                                    </div>
                            
                                    {/* Pending Approvals Widget */}
                                    <div className="col-md-3">
                                        <div className="card bg-danger text-white">
                                            <div className="card-body">
                                                <h5 className="card-title">Pending Approvals</h5>
                                                <p className="card-text">3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                {/* Activity Summary */}
                                <div className="mt-5">
                                    <h6>Recent Activity</h6>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <strong>Event 1:</strong> Upcoming Event on 25th December, 2024
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Group 2:</strong> New group created with level 'Intermediate'
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Event 3:</strong> Event moved to 30th December, 2024
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            )}
                            {activeSection === 'Create Event' && <CreateEvent />}
                            {activeSection === 'Create Group' && <CreateGroup />}
                            {activeSection === 'View Event' && <ViewEvent />}
                            {activeSection === 'View Group' && <ViewGroup />}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Logout Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to logout?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TeacherPage;
