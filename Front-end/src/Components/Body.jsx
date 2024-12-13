import React from 'react';
import { Link } from 'react-router-dom';

function Body() {
    return (
        <div className="body-container">
            <h2 className="system-title">Welcome to the Language Learning System</h2>
            <p className="description">
                Unlock a world of opportunities with our interactive and flexible language learning platform. Whether you're a beginner or an advanced learner, our tailored resources and engaging lessons will make your journey enjoyable and effective. Learn at your own pace and connect with a vibrant community of language enthusiasts.
            </p>

            <h3 className="section-title">Why Choose Us?</h3>
            <div className="image-container">
                <div className="shadow-content">
                    <div className="column-layout">
                        <div className="column">
                            <h4>Expert Instructors</h4>
                            <p>Receive guidance from experienced language educators.</p>
                        </div>
                        <div className="column">
                            <h4>Flexible Learning</h4>
                            <p>Learn anytime with resources available 24/7.</p>
                        </div>
                        <div className="column">
                            <h4>Interactive Content</h4>
                            <p>Engage in lessons that simulate real-life scenarios.</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="call-to-action">Get Started Today!</h3>
            <p className="call-to-action-description">
                Join now and begin your language learning adventure. Whether for travel, career growth, or personal enrichment, we’re here to help you succeed!
            </p>
            <Link to='/login'>
                <button className="get-started-button">Get Started</button>
            </Link>
        </div>
    );
}

export default Body;
