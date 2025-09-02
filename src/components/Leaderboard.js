import React, { useState, useEffect } from 'react';
import { Card, Table, Spinner } from 'react-bootstrap';
import { db } from '../config/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'activities'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const points = {};
      querySnapshot.forEach((doc) => {
        const { admin, points: pts } = doc.data();
        if (points[admin]) {
          points[admin] += pts;
        } else {
          points[admin] = pts;
        }
      });

      const sortedScores = Object.entries(points)
        .map(([name, score]) => ({ name, score }))
        .sort((a, b) => b.score - a.score);
      
      setScores(sortedScores);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Card>
        <Card.Header as="h4">Puan Durumu</Card.Header>
        <Card.Body className="text-center">
          <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header as="h4">Puan Durumu</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Admin</th>
              <th>Puan</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((admin, index) => (
              <tr key={admin.name}>
                <td>{index + 1}</td>
                <td>{admin.name}</td>
                <td>{admin.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
