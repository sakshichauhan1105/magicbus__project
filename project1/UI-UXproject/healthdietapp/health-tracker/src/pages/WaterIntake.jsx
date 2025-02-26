import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, ProgressBar, Alert } from "react-bootstrap";

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState("");
  const [entries, setEntries] = useState([]);
  const [totalWater, setTotalWater] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000); // Default goal: 3L (3000ml)

  // Load data from local storage on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("waterEntries")) || [];
    const savedGoal = localStorage.getItem("waterGoal") || 3000;

    setEntries(savedEntries);
    setWaterGoal(parseInt(savedGoal));
    updateTotalWater(savedEntries);
  }, []);

  // Save data to local storage when entries change
  useEffect(() => {
    localStorage.setItem("waterEntries", JSON.stringify(entries));
    localStorage.setItem("waterGoal", waterGoal.toString());
  }, [entries, waterGoal]);

  const updateTotalWater = (entries) => {
    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);
    setTotalWater(total);
  };

  const handleAddWater = () => {
    if (!waterIntake) return;
    const newEntry = { amount: parseInt(waterIntake), timestamp: new Date().toLocaleTimeString() };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    updateTotalWater(updatedEntries);

    setWaterIntake("");
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
    updateTotalWater(updatedEntries);
  };

  const progressPercentage = Math.min((totalWater / waterGoal) * 100, 100);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Water Intake Tracker 💧</h2>

      {/* Set Water Goal */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Form.Group controlId="waterGoal">
            <Form.Label>Daily Water Goal (ml)</Form.Label>
            <Form.Control
              type="number"
              value={waterGoal}
              onChange={(e) => setWaterGoal(parseInt(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Add Water Intake */}
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="waterIntake">
            <Form.Label>Enter Water Intake (ml)</Form.Label>
            <Form.Control
              type="number"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6} className="d-flex align-items-end">
          <Button variant="primary" onClick={handleAddWater}>Add Water</Button>
        </Col>
      </Row>

      {/* Water Intake Log */}
      <Row className="mt-4">
        <Col>
          <h4>Water Intake Log</h4>
          {entries.length === 0 ? (
            <Alert variant="info">No water intake logged yet.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Amount (ml)</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.amount}</td>
                    <td>{entry.timestamp}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteEntry(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* Progress Bar */}
      <Row className="mt-4">
        <Col>
          <h4>Daily Progress</h4>
          <ProgressBar now={progressPercentage} label={`${Math.round(progressPercentage)}%`} />
          <p className="mt-2">Water Intake: {totalWater} / {waterGoal} ml</p>
        </Col>
      </Row>
    </Container>
  );
};

export default WaterTracker;
