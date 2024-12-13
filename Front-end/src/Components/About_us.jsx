import React from 'react';
const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="container py-5">
                <h1 className="text-center mb-4">About Us</h1>
                <p className="lead text-center mb-5">
                    We are a dedicated team of professionals committed to delivering the best services to our customers.
                </p>
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <h3>Our Mission</h3>
                        <p>
                            Our mission is to provide top-quality products and services that exceed customer expectations.
                            We strive for excellence in every aspect of our work and aim to build lasting relationships with our clients.
                        </p>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <h3>Our Vision</h3>
                        <p>
                            We envision a world where our innovative solutions empower individuals and businesses to achieve their goals.
                            We are committed to sustainability and making a positive impact on our community.
                        </p>
                    </div>
                </div>
                <h2 className="text-center my-4">Meet Our Team</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card text-center">
                            <img src="team-member1.jpg" className="card-img-top" alt="Team Member 1" />
                            <div className="card-body">
                                <h5 className="card-title">Lorem joe</h5>
                                <p className="card-text">CEO & Founder</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center">
                            <img src="team-member2.jpg" className="card-img-top" alt="Team Member 2" />
                            <div className="card-body">
                                <h5 className="card-title">Lorem joe</h5>
                                <p className="card-text">Chief Marketing Officer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center">
                            <img src="team-member3.jpg" className="card-img-top" alt="Team Member 3" />
                            <div className="card-body">
                                <h5 className="card-title">Lorem joe</h5>
                                <p className="card-text">Lead Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
