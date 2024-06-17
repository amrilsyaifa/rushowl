import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <div className="home-body">
      <div className="home-container">
        <div className="home-card" onClick={() => navigate("/auth/zod/login")}>
          <h2>Login Page ZOD Validation</h2>
          <p>This login page using ZOD Validation</p>
        </div>
        <div
          className="home-card"
          onClick={() => navigate("/auth/manual/login")}
        >
          <h2>Login Page Manual Validation</h2>
          <p>This login page using Manual Validation</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
