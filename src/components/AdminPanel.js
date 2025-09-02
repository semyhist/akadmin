/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaUserShield, FaPlusCircle, FaUser, FaClipboardList } from 'react-icons/fa';

const AdminPanel = () => {
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');

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
        description: description,
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
    <Card className="card-custom">
      <Card.Header as="h4"><FaUserShield className="me-2" />ADMIN PANELI</Card.Header>
      <Card.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="adminSelect">
            <Form.Label>Admin Seç</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaUser /></InputGroup.Text>
              <Form.Select value={selectedAdmin} onChange={e => setSelectedAdmin(e.target.value)} className="form-select-custom">
                <option value="">Seçiniz...</option>
                {admins.map(admin => <option key={admin} value={admin}>{admin}</option>)}
              </Form.Select>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="actionSelect">
            <Form.Label>Eylem Seç</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaClipboardList /></InputGroup.Text>
              <Form.Select value={selectedAction} onChange={e => setSelectedAction(e.target.value)} className="form-select-custom">
                <option value="">Seçiniz...</option>
                {actions.map(action => <option key={action.name} value={action.name}>{`${action.name} (${action.points})`}</option>)}>
              </Form.Select>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Açıklama (opsiyonel)</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? 'Ekleniyor...' : <><FaPlusCircle className="me-2" /> Puanı Ekle</>}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminPanel;
