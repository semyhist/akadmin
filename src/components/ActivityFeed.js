import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner, Badge } from 'react-bootstrap';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { FaPlus, FaMinus, FaCheckCircle, FaTrophy, FaTimesCircle } from 'react-icons/fa';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('createdAt', 'desc'), limit(7));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const activitiesData = [];
      querySnapshot.forEach((doc) => {
        activitiesData.push({ id: doc.id, ...doc.data() });
      });
      setActivities(activitiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderIcon = (action) => {
    if (action.includes('ekledi')) return <FaPlus className="me-2 text-success" />;
    if (action.includes('sildi')) return <FaMinus className="me-2 text-danger" />;
    return <FaCheckCircle className="me-2 text-info" />;
  };

  const renderPointsBadge = (points) => {
    if (points > 0) {
      return <Badge bg="success" pill><FaTrophy className="me-1" /> +{points}</Badge>;
    } else if (points < 0) {
      return <Badge bg="danger" pill><FaTimesCircle className="me-1" /> {points}</Badge>;
    } else {
      return <Badge bg="secondary" pill>{points}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="card-custom mt-4">
        <Card.Header as="h4">SON ETKİNLİKLER</Card.Header>
        <Card.Body className="text-center">
          <Spinner animation="border" variant="danger" />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card-custom mt-4">
      <Card.Header as="h4">SON ETKİNLİKLER</Card.Header>
      <ListGroup variant="flush">
        {activities.map((activity) => (
          <ListGroup.Item key={activity.id} className="list-group-item-custom d-flex justify-content-between align-items-center">
            <div>
              {renderIcon(activity.action)}
              <strong>{activity.admin}</strong> {activity.action}
              {activity.description && <p className="mb-0 text-light"><small>{activity.description}</small></p>}
            </div>
            {renderPointsBadge(activity.points)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default ActivityFeed;