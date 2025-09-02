import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import AppNavbar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import ActivityFeed from '../components/ActivityFeed';
import AdminPanel from '../components/AdminPanel';

const Dashboard = () => {
  const { userRole } = useAuth();

  return (
    <>
      <AppNavbar />
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <Leaderboard />
            <ActivityFeed />
          </Col>
          <Col md={4}>
            {userRole === 'super-admin' && <AdminPanel />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
