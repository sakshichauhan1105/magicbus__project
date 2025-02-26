import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import CalorieTracker from "./pages/CalorieTracker";
import WaterIntake from "./pages/WaterIntake";
import MealPlanner from "./pages/MealPlanner";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/calorie-tracker"
          element={
            <PrivateRoute>
              <CalorieTracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/water-intake"
          element={
            <PrivateRoute>
              <WaterIntake />
            </PrivateRoute>
          }
        />
        <Route
          path="/meal-planner"
          element={
            <PrivateRoute>
              <MealPlanner />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
