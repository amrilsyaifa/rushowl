import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { LoginInputProps } from "./types";

const loginFn = async (param: LoginInputProps): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    if (
      param.email === "user@example.com" &&
      param.password === "password123"
    ) {
      setTimeout(async () => {
        resolve({ message: "Login successful", token: "123456" });
      }, 3000);
    } else {
      try {
        const response = await axios.post("/login", param);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["login"] });
    },
  });
};

export default useLogin;
