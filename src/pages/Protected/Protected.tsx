import { useCallback, useState } from "react";
import "./Protected.css";
import List from "../../components/List";

const Protected = () => {
  const [count, setCount] = useState(0);

  // Use useCallback to memoize the increment function
  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className="protected-body">
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
