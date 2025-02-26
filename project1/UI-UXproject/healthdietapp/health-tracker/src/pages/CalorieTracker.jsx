import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import './CalorieTracker.css';

const CalorieTracker = () => {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [entries, setEntries] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("calorieEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("calorieEntries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (!meal || !calories) return;

    const newEntry = { meal, calories: parseInt(calories) };
    setEntries([...entries, newEntry]);

    // Reset form
    setMeal("");
    setCalories("");
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  return (
    <Container className="mt-4">
      <h2>Calorie Tracker</h2>

      <Form.Group className="mb-3">
        <Form.Label>Meal</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter meal"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Calories</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleAddEntry}>
        Add Entry
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Meal</th>
            <th>Calories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.meal}</td>
              <td>{entry.calories}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteEntry(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CalorieTracker;
