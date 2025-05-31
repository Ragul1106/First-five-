import React, { useState } from 'react';
import '../assets/css/TabsComponent.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState('home');

  const contentMap = {
    home: {
      icon: <FaHome />,
      content: (
        <>
          <h3>Dashboard Overview</h3>
          <p>
            Here’s a quick overview of your dashboard metrics and recent activity.
            Keep track of your progress and stay updated.
          </p>
          <ul>
            <li>New user signups: 120</li>
            <li>Monthly revenue: $5,430</li>
            <li>Support tickets resolved: 45</li>
          </ul>
          <button className="btn btn-primary mt-3">View Full Report</button>
        </>
      ),
    },
    profile: {
      icon: <FaUser />,
      content: (
        <>
          <h3>User Profile</h3>
          <p>Manage your personal information and account settings below:</p>
          <form>
            <div className="mb-3 text-start">
              <label htmlFor="name" className="form-label">Name:</label>
              <input id="name" type="text" className="form-control" placeholder="John Doe" />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">Email:</label>
              <input id="email" type="email" className="form-control" placeholder="john@example.com" />
            </div>
            <button type="submit" className="btn btn-success">Update Profile</button>
          </form>
        </>
      ),
    },
    settings: {
      icon: <FaCog />,
      content: (
        <>
          <h3>Application Settings</h3>
          <p>Customize your preferences and configure app features:</p>
          <ul>
            <li><strong>Notifications:</strong> Enabled</li>
            <li><strong>Dark Mode:</strong> Disabled</li>
            <li><strong>Auto-Update:</strong> Enabled</li>
          </ul>
          <button className="btn btn-secondary mt-3">Change Settings</button>
        </>
      ),
    },
  };

  return (
    <div className="text-center animate__animated animate__fadeInUp">
      <h2 className="mb-4">🧭 Tabs Component</h2>

      <ul className="nav nav-tabs justify-content-center mb-4" style={{ cursor: 'pointer' }}>
        {Object.entries(contentMap).map(([key, { icon }]) => (
          <li className="nav-item" key={key}>
            <button
              aria-selected={activeTab === key}
              className={`nav-link fw-bold d-flex align-items-center justify-content-center px-4 py-2 mx-1 tab-btn ${
                activeTab === key ? 'active tab-glow' : 'text-muted'
              }`}
              onClick={() => setActiveTab(key)}
              role="tab"
              type="button"
            >
              <motion.span
                className="me-2"
                layoutId="tab-icon"
                key={key}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={activeTab === key ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {icon}
              </motion.span>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="border p-4 rounded bg-light shadow text-start" style={{ minHeight: '180px' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {contentMap[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabsComponent;
