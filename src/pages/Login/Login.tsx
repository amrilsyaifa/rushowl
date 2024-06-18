import { useCallback, useMemo, useState } from "react";
import "./Login.css";
import useLogin from "../../services/auth/useLogin";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Memoize the email and password values
  const memoizedEmail = useMemo(() => email, [email]);
  const memoizedPassword = useMemo(() => password, [password]);

  // Memoize the event handlers
  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid";
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    } else if (password.length > 20) {
      return "Password must be at most 20 characters";
    }
    return undefined;
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const emailError = validateEmail(memoizedEmail);
      const passwordError = validatePassword(memoizedPassword);

      if (emailError || passwordError) {
        setErrors({ email: emailError, password: passwordError });
        return;
      }

      // Clear errors if no validation issues
      setErrors({});

      try {
        setIsLoading(true);
        // Call your API here
        const response = await mutateAsync({
          email: memoizedEmail,
          password: memoizedPassword,
        });

        // Handle your API response here
        // Setup Cookies or Local Storage here
        setIsLoading(false);
        if (response.token) {
          cookies.set("token", response.token, { path: "/" });
          navigate("/protected");
        }
      } catch (error) {
        // Handle your API errors here
        setIsLoading(false);
        setErrors({ password: "Invalid email or password" });
      }
    },
    [memoizedEmail, memoizedPassword]
  );

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={memoizedEmail}
              onChange={handleEmailChange}
            />
            <span className="error-message">{errors.email}</span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={memoizedPassword}
              onChange={handlePasswordChange}
            />
            <span className="error-message">{errors.password}</span>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
