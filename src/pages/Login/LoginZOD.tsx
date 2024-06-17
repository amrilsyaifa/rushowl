import "./Login.css";

const LoginZOD = () => {
  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginZOD;
