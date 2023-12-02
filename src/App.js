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
          <Route
            path="/model_website/"
            element={<ToggleVisibilityComponent />}
          />
          <Route path="*" element={<Navigate to="/model_website/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
