import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ToggleVisibilityComponent from "./toggleVisibility.jsx";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dataset/:id" element={<ToggleVisibilityComponent />} />
          <Route path="*" element={<Navigate to="/dataset/2" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
