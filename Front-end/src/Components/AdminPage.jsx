import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Collapse, Nav, Modal } from 'react-bootstrap';
import { FaBars, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import profilePic from '/src/assets/images/b.png';
import { useNavigate } from 'react-router-dom'; 

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
    submenu: {
        paddingLeft: '20px',
    },
    profilePic: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginBottom: '20px',
    },
};

function AdminPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [expandedDashboards, setExpandedDashboards] = useState(false);
    const [expandedApplications, setExpandedApplications] = useState(false);
    const [activeSection, setActiveSection] = useState('Main Dashboard');
    const [showLogoutModal, setShowLogoutModal] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
       
        const user = sessionStorage.getItem('user');
        if (!user) {
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
                            {/* Dashboards Section */}
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => {
                                        setExpandedDashboards(!expandedDashboards);
                                        handleSectionChange('Dashboards');
                                    }}
                                >
                                    Dashboards {expandedDashboards ? <FaChevronUp /> : <FaChevronDown />}
                                </Button>
                                <Collapse in={expandedDashboards}>
                                    <Nav className="flex-column" style={styles.submenu}>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('Teachers Dashboard')}>
                                                Manage Teachers
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('Students Dashboard')}>
                                                Manage Students
                                            </Button>
                                        </Nav.Item>
                                    </Nav>
                                </Collapse>
                            </Nav.Item>

                            {/* Applications Section */}
                            <Nav.Item>
                                <Button
                                    variant="link"
                                    style={styles.navLink}
                                    onClick={() => {
                                        setExpandedApplications(!expandedApplications);
                                        handleSectionChange('Applications');
                                    }}
                                >
                                    Applications {expandedApplications ? <FaChevronUp /> : <FaChevronDown />}
                                </Button>
                                <Collapse in={expandedApplications}>
                                    <Nav className="flex-column" style={styles.submenu}>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('Calendar')}>
                                                Calendar
                                            </Button>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="link" style={styles.navLink} onClick={() => handleSectionChange('To-Do List')}>
                                                To-Do List
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
                            {activeSection === 'Teachers Dashboard' && (
                                <div>
                                    <p>Welcome to the Teachers Dashboard. Here you can manage teacher information, schedules, and performance reviews.</p>
                                    <p>Explore options to add new teachers, update existing profiles, and view reports.</p>
                                </div>
                            )}
                            {activeSection === 'Students Dashboard' && (
                                <div>
                                    <p>Welcome to the Students Dashboard. Here you can manage student details, grades, and attendance.</p>
                                    <p>Explore options to add new students, update records, and view academic performance.</p>
                                </div>
                            )}
                            {activeSection === 'Calendar' && (
                                <div>
                                    <p>Here you can view and manage school events, holidays, and schedules.</p>
                                    <p>Sync with Google Calendar to keep everyone updated.</p>
                                </div>
                            )}
                            {activeSection === 'To-Do List' && (
                                <div>
                                    <p>Manage your tasks and reminders here.</p>
                                    <p>Keep track of important deadlines and assignments.</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to log out?</p>
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

export default AdminPage;
