import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero text-white text-center py-5"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
        <h1
  className="display-4"
  style={{
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.99)",
  }}
>
  Welcome to Health Tracker
</h1>
<p
  className="lead"
  style={{
    fontWeight: "bold",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.99)",
  }}
>
  Manage your health goals with ease. Track your calories, water intake,
  and meals every day!
</p>
          <Button variant="primary" size="lg" onClick={() => navigate("/calorie-tracker")}>
            Get Started
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <Container>
          <h2 className="text-center mb-4">Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center">Calorie Track</Card.Title>
                  <Card.Text>
                    Keep track of your daily calorie intake and stay on target with your health goals.
                  </Card.Text>
                  <Button variant="danger" onClick={() => navigate("/calorie-tracker")}>
                    Track Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center">Meal Planner</Card.Title>
                  <Card.Text>
                    Plan your meals and make healthier food choices with personalized suggestions.
                  </Card.Text>
                  <Button variant="danger" onClick={() => navigate("/meal-planner")}>
                    Plan Meals
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body className="d-flex flex-column align-items-center"> 
                  <Card.Title className="text-center">Water Intake</Card.Title>
                  <Card.Text>
                    Monitor your daily water intake to stay hydrated and improve your overall health.
                  </Card.Text>
                  <Button variant="danger" onClick={() => navigate("/water-intake")}>
                    Track Water
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4">
        <p>&copy; 2025 Health Tracker. by Sakshi Chauhan.</p>
      </footer>
    </>
  );
};

export default Home;

