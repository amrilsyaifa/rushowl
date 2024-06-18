import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Login.css";
import { LoginSchema, FormData } from "./schemas";
import useLogin from "../../services/auth/useLogin";

const LoginZOD = () => {
  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Call your API here
      const response = await mutate(data);

      // Handle your API response here
      // Setup Cookies or Local Storage here
      console.log("isi response >>> ", response);
    } catch (error) {
      // Handle your API errors here
      console.error("isi error >>> ", error);
    }
  };

  console.log("isi isValid >>> ", isValid);
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
            <button type="submit" disabled={!isValid}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginZOD;
