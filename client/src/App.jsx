import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountDetailsPage from "./pages/AccountDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/:accountNumber" element={<AccountDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
