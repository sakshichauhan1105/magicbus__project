import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Alert } from "react-bootstrap";

const MealPlanner = () => {
  const [meal, setMeal] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [meals, setMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Load saved meals from local storage
  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem("mealPlanner")) || [];
    setMeals(savedMeals);
    updateTotalCalories(savedMeals);
  }, []);

  // Save meals to local storage
  useEffect(() => {
    localStorage.setItem("mealPlanner", JSON.stringify(meals));
    updateTotalCalories(meals);
  }, [meals]);

  const updateTotalCalories = (meals) => {
    const total = meals.reduce((sum, meal) => sum + meal.calories, 0);
    setTotalCalories(total);
  };

  const handleAddMeal = () => {
    if (!meal || !time || !calories) return;
    const newMeal = { meal, time, calories: parseInt(calories) };

    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);

    setMeal("");
    setTime("");
    setCalories("");
  };

  const handleDeleteMeal = (index) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Meal Planner 🍽️</h2>

      {/* Add Meal Form */}
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Meal Name</Form.Label>
            <Form.Control type="text" value={meal} onChange={(e) => setMeal(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Calories</Form.Label>
            <Form.Control type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="success" onClick={handleAddMeal}>Add Meal</Button>
        </Col>
      </Row>

      {/* Meal List */}
      <Row className="mt-4">
        <Col>
          <h4>Planned Meals</h4>
          {meals.length === 0 ? (
            <Alert variant="info">No meals planned yet.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Time</th>
                  <th>Calories</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, index) => (
                  <tr key={index}>
                    <td>{meal.meal}</td>
                    <td>{meal.time}</td>
                    <td>{meal.calories}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteMeal(index)}>
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

      {/* Total Calories */}
      <Row className="mt-3">
        <Col className="text-center">
          <h5>Total Daily Calories: {totalCalories} kcal</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default MealPlanner;
