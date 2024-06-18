import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Login.css";
import { LoginSchema, FormData } from "./schemas";
import useLogin from "../../services/auth/useLogin";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies(null, { path: "/" });

const LoginZOD = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync } = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      // Call your API here
      const response = await mutateAsync(data);

      // Handle your API response here
      // Setup Cookies or Local Storage here
      setIsLoading(false);
      if (response.token) {
        cookies.set("token", response.token, { path: "/" });
        navigate("/protected");
      }
    } catch (error) {
      // Handle your API errors here
      console.error("isi error >>> ", error);
      setIsLoading(false);
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              {...register("email")}
            />
            <span className="error-message">{errors?.email?.message}</span>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              {...register("password")}
            />
            <span className="error-message">{errors?.password?.message}</span>
            <button type="submit" disabled={!isValid || isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginZOD;
