import React, { useContext } from 'react';
import './Home.css';
import imgProfile from '../../assets/FB_IMG_1734733939208.jpg'; // Placeholder image
import { AuthContext } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  // Display loading message if currentUser is not available
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homeContainer">
      {/* Hero Section */}
      <section className="heroSection">
        <h1>Welcome Back, {currentUser.firstName || "Tarek"}!</h1>
        <p>Your personalized dashboard is ready.</p>
        <button className="ctaButton">Explore Now</button>
      </section>

      {/* User Information Summary */}
      <section className="userSummary">
        <img src={currentUser?.image || imgProfile} alt="Profile" className="profileImage" />
        <h2>{currentUser.firstName || "Tarek"} {currentUser.lastName || "Mohamed"}</h2>
        <p>Email: {currentUser.email}</p>
      </section>

      {/* Navigation Cards */}
      <section className="navigationCards">
        <div className="card">
          <h3>Profile</h3>
          <p>View and edit your profile information.</p>
          <Link to="/dashboard/profile">
            <button className="cardButton firstBtn">Go to Profile</button>
          </Link>
        </div>
        <div className="card">
          <h3>Settings</h3>
          <p>Customize your preferences and privacy settings.</p>
          <Link to="/settings">
            <button className="cardButton">Go to Settings</button>
          </Link>
        </div>
        <div className="card">
          <h3>Messages</h3>
          <p>Check your recent messages and notifications.</p>
          <Link to="/messages">
            <button className="cardButton">View Messages</button>
          </Link>
        </div>
      </section>

      {/* Recent Activity or Notifications */}
      <section className="recentActivity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Updated profile picture.</li>
          <li>Changed password.</li>
          <li>Added a new phone number.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
