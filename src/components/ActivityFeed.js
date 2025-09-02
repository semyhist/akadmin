import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('createdAt', 'desc'), limit(5));
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

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card className="mt-4">
      <Card.Header as="h4">Son Etkinlikler</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {activities.map((activity) => (
            <ListGroup.Item key={activity.id}>
              {`${activity.admin}: ${activity.action} (${activity.points > 0 ? '+' : ''}${activity.points})`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ActivityFeed;
