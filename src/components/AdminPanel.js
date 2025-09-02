import React, { useState } from 'react';
import { Card, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AdminPanel = () => {
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const admins = ['Aydın', 'Azra', 'Melih', 'Nisa', 'Taha', 'Yağız', 'Yankı', 'Yunus'];
  const actions = [
    { name: 'Reels Üretim', points: 5 },
    { name: 'Reels 50K üstü', points: 3 },
    { name: 'Reels 150K üstü', points: 3 },
    { name: 'Reels 250K üstü', points: 5 },
    { name: 'Slayt Üretim', points: 5 },
    { name: 'Slayt Yüksek etkileşim', points: 3 },
    { name: 'Tek Görsel Üretim', points: 3 },
    { name: 'Tek Görsel Yüksek etkileşim', points: 2 },
    { name: 'Fikir sunmak', points: 2 },
    { name: 'Geç kalmak / teslim etmemek', points: -3 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAdmin || !selectedAction) {
      return setError('Lütfen bir admin ve eylem seçin.');
    }

    setError('');
    setMessage('');
    setLoading(true);

    const actionDetails = actions.find(a => a.name === selectedAction);

    try {
      await addDoc(collection(db, 'activities'), {
        admin: selectedAdmin,
        action: actionDetails.name,
        points: actionDetails.points,
        createdAt: serverTimestamp(),
      });
      setMessage(`Başarıyla ${selectedAdmin} için ${actionDetails.points} puan eklendi.`);
      setSelectedAdmin('');
      setSelectedAction('');
    } catch (e) {
      setError('Puan eklenirken bir hata oluştu.');
      console.error("Error adding document: ", e);
    }

    setLoading(false);
  };

  return (
    <Card className="mt-4">
      <Card.Header as="h4">Admin Paneli: Puan Ekle</Card.Header>
      <Card.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group controlId="adminSelect">
                <Form.Label>Admin Seç</Form.Label>
                <Form.Control as="select" value={selectedAdmin} onChange={e => setSelectedAdmin(e.target.value)}>
                  <option value="">Seçiniz...</option>
                  {admins.map(admin => <option key={admin} value={admin}>{admin}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={12} className="mt-2">
              <Form.Group controlId="actionSelect">
                <Form.Label>Eylem Seç</Form.Label>
                <Form.Control as="select" value={selectedAction} onChange={e => setSelectedAction(e.target.value)}>
                  <option value="">Seçiniz...</option>
                  {actions.map(action => <option key={action.name} value={action.name}>{`${action.name} (${action.points})`}</option>)}>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-3 w-100" disabled={loading}>
            {loading ? 'Ekleniyor...' : 'Puanı Ekle'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminPanel;
