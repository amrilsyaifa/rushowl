import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, LoginZOD } from "../pages/Login";
import Protected from "../pages/Protected";
import App from "../pages/Home/Home";

const RouteConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/zod/login" element={<LoginZOD />} />
        <Route path="/auth/manual/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
