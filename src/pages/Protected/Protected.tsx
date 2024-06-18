import { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Protected.css";
import List from "../../components/List";

const cookies = new Cookies(null, { path: "/" });

const Protected = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  // Use useCallback to memoize the increment function
  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const token = cookies.get("token");

  useEffect(() => {
    if (token === undefined || token === null || token === "") {
      navigate("/");
    }
  }, [token]);

  const onLogout = () => {
    cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="protected-body">
      <div className="wrapper-logout">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="protected-container">
        <List />
        <div className="count-space">
          <h1>Counter</h1>
          <button onClick={incrementCount}>
            Increment Count (does not affect processed list)
          </button>
          <p>Count: {count}</p>
        </div>
      </div>
    </div>
  );
};

export default Protected;
