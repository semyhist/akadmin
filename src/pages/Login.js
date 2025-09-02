import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import '../Login.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError(`Giriş başarısız: ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card className="card-custom login-card animated-fade-in">
          <Card.Header as="h2" className="text-center border-0">
            ARKA KANAT F1 LİG PORTALI
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control type="email" ref={emailRef} required className="form-control-custom" placeholder="admin@arkakanat.com" />
                </InputGroup>
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text>
                  <Form.Control type="password" ref={passwordRef} required className="form-control-custom" placeholder="******" />
                </InputGroup>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4 btn-primary-custom" type="submit">
                <FaSignInAlt className="me-2" /> Giriş Yap
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;