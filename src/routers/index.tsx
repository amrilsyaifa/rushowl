import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import App from "../pages/Home/Home";

const RouteConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
